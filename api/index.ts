import { default as axios, AxiosResponse, AxiosRequestConfig } from "axios";

// set Jarvis url based on env
export const getJarvisUrl = (): string => {
    let env = process.env.REACT_APP_ARCTURUS_ENV!;

    if (!env) {
        throw new Error(
            "Invalid configuration. Expected environment variable 'REACT_APP_ARCTURUS_ENV', accepted values: production | development. See README.md"
        );
    }

    env = env.toLowerCase();

    if (env === "development") {
        return "https://jarvis-dev.arcturus.us.com";
    } else if (env === "production") {
        return "https://jarvis.arcturus.us.com";
    } else if (env === "staging") {
        return "https://jarvis-staging.arcturus.us.com";
    } else if (env === "local") {
        return "http://localhost:5000";
    } else {
        throw Error(
            "Invalid configuration. " +
                process.env.REACT_APP_ARCTURUS_ENV! +
                ". Accepted values: production | development"
        );
    }
};

export const api = axios.create({
    baseURL: getJarvisUrl(), // For local testing, replace getJarvisUrl() with localhost url
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN"
});

export enum Status {
    SUCCESS,
    ERROR
}

export enum StatusCode {
    // General error codes
    Success = 200,

    // Client side errors
    EmailExists = 300,

    // Standard auth and server error codes
    BadRequest = 400,
    Unauthorized,
    NotAllowed = 405,

    // Custom auth/server error codes
    InvalidLogin = 415,
    InvalidBody,
    InsufficientPrivileges,
    IncorrectPassword,
    ClientLogicError,

    InternalServerError = 500,
}

/**
 * This is a response from Jarvis
 */
export class RestResponse {
    public statusCode: StatusCode | undefined;
    public status: Status | undefined;
    public message: string | undefined;
    public result?: any;

    constructor(init?: Partial<RestResponse>) {
        Object.assign(this, init);
    }
}

export class SuccessResponse<T> extends RestResponse {
    constructor(message: string, result?: T) {
        super({
            status: Status.SUCCESS,
            statusCode: StatusCode.Success,
            message,
            result
        });
    }
}

export class ErrorResponse extends RestResponse {
    constructor(message: string, statusCode: StatusCode = StatusCode.InternalServerError) {
        super({ status: Status.ERROR, statusCode, message });
    }
}

export type ConnectionErrorType = "Timeout" | "Network Error" | "Other";
export class ConnectionError extends Error {
    errorType: ConnectionErrorType = "Other";
    constructor(message: string, type: ConnectionErrorType) {
        super(message);
        this.errorType = type;
    }
}

/**
 * Utility method for error handling and normalizing response types.
 */
export const request = async <T>(authenticate: boolean, config: AxiosRequestConfig): Promise<T> => {
    if (authenticate) {
        const token = localStorage.getItem("verstaanToken");
        // If we don't have a token set in the client application, don't bother sending the request. Just reject with an error response.
        if (!token) {
            throw new ErrorResponse("No token set in local storage", 302);
        }
        config.headers = {
            Authorization: `Bearer ${token}`,
            ...config.headers
        };
    }

    let response: AxiosResponse<RestResponse>;
    try {
        response = await api.request<RestResponse>(config);
    } catch (error) {
        // TODO: figure out how to intelligently use the axios error here, and set connection error accordingly
        throw new ConnectionError("Axios error", "Timeout");
        // TODO: log w/ PM2
    }

    if (response.data.status === Status.SUCCESS) {
        // This is the key line, note the generic UserProfile set here is overriding typescript because
        // we know that this endpoint returns type UserProfile in a success response
        const successResponse = response.data as SuccessResponse<T>;
        console.log(successResponse.message); // PM2 log?
        return successResponse.result;
    } else {
        // PM2 log?
        throw new ErrorResponse(response.data.message ?? "No Message", response.data.statusCode);
    }
};


