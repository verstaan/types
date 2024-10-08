// eslint-disable-next-line,import/no-extraneous-dependencies
import { default as axios, AxiosResponse, AxiosRequestConfig } from "axios";
import { auth } from "../firebase";

// set Jarvis url based on env
export const getJarvisUrl = (): string => {
    let env = process.env.REACT_APP_ENV!;

    if (!env) {
        throw new Error(
            "Invalid configuration. Expected environment variable 'REACT_APP_ENV', accepted values: production | staging | development | local. See README.md"
        );
    }

    env = env.toLowerCase();

    if (env === "development") {
        return "https://jarvis-dev.arcturus.co";
    } else if (env === "production") {
        return "https://jarvis.arcturus.co";
    } else if (env === "staging") {
        return "https://jarvis-staging.arcturus.co";
    } else if (env === "local") {
        return "http://localhost:5000";
    } else {
        throw Error("Invalid configuration. " + process.env.REACT_APP_ENV! + ". Accepted values: production | staging | development | local");
    }
};

export const api = axios.create({
    baseURL: process.env.REACT_APP_ENV ? getJarvisUrl() : "", // For local testing, replace getJarvisUrl() with localhost url
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

    InternalServerError = 500
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

// function used in request to send response
const getResponse = async <T>(config: AxiosRequestConfig): Promise<T> => {
    let response: AxiosResponse<RestResponse>;

    try {
        response = await api.request<RestResponse>(config);
    } catch (error) {
        // TODO: figure out how to intelligently use the axios error here, and set connection error accordingly
        console.error(error);
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
        console.warn("Received jarvis error response: " + response.data.message ?? "No message");

        if (response.data.message && response.data.message.includes("auth/id-token-expired") && auth.currentUser) {
            console.log("Refreshing token due to jarvis error response...");
            auth.currentUser
                .getIdToken(true)
                .then((token) => {
                    console.log("Token refreshed on error response: " + token);
                })
                .catch((err) => {
                    console.error("Failed to get new user IdToken on error response: " + err);
                });
        }

        throw new ErrorResponse(response.data.message ?? "No Message", response.data.statusCode);
    }
};

// function used in request to get current firebase user
const getCurrentUserToken = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        try {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();

                if (user) {
                    user.getIdToken()
                        .then((token) => {
                            resolve(token);
                        })
                        .catch((err) => {
                            console.warn("Failed to retrieve firebase user token: " + err);
                        });
                } else {
                    console.warn("Cannot retrieve token, no firebase user is signed in");
                }
            }, reject);
        } catch (err) {
            console.log("Error in authState listener on token fetch: " + err);
            reject(err);
        }
    });
};

/**
 * Utility method for error handling and normalizing response types.
 */
export const request = async <T>(authenticate: boolean, config: AxiosRequestConfig): Promise<T> => {
    if (authenticate) {
        let token = localStorage.getItem("idToken");

        if (!token) {
            // Only get token through authStateHandler when not in Orion (no fingerprint set)
            const fingerprint = localStorage.getItem("fingerprint");
            if (!fingerprint) {
                try {
                    token = await getCurrentUserToken();
                } catch (err) {
                    console.warn("Error retrieving firebase user token: " + err);
                }
            }
        }

        if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers
            };
            return getResponse(config);
        } else {
            throw new ErrorResponse("No token in cache, user is signed out.", StatusCode.Unauthorized);
        }
    } else {
        return getResponse(config);
    }
};
