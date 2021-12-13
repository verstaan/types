// eslint-disable-next-line import/no-named-default,import/no-extraneous-dependencies
import { default as axios, AxiosResponse, AxiosRequestConfig } from "axios";
import { auth } from "../firebase";
import { User as FirebaseUser } from "firebase/auth";
import "source-map-support/register";


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
        return "https://jarvis-dev.arcturus.us.com";
    } else if (env === "production") {
        return "https://jarvis.arcturus.us.com";
    } else if (env === "staging") {
        return "https://jarvis-staging.arcturus.us.com";
    } else if (env === "local") {
        return "http://localhost:5000";
    } else {
        throw Error(
            "Invalid configuration. " + process.env.REACT_APP_ENV! + ". Accepted values: production | staging | development | local"
        );
    }
};

export const api = axios.create({
    baseURL: process.env.REACT_APP_ENV ? getJarvisUrl() : "", // For local testing, replace getJarvisUrl() with localhost url
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
});

export enum Status {
    SUCCESS,
    ERROR,
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
            result,
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
    console.log("?????")

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
        // PM2 log?

        console.log("hello???")
        console.log("Need to check for token expiry here: ");
        console.log(response);

        throw new ErrorResponse(response.data.message ?? "No Message", response.data.statusCode);
    }
}

// function used in request to get current firebase user
const getCurrentUserToken = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        try {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                console.log("Current user: " + user)

                if (user) {
                    user.getIdToken()
                        .then((token) => {
                            resolve(token);
                        })
                        .catch((err) => {
                            console.log("failed to get id token!");
                            console.log(err)
                        })
                } else {
                    console.log("The user is gone!!!!")
                }

            }, reject);
        } catch (err) {
            console.log("you aint logged in no mo: " + err)
        }

    });
}

/**
 * Utility method for error handling and normalizing response types.
 */
export const request = async <T>(authenticate: boolean, config: AxiosRequestConfig): Promise<T> => {
    if (authenticate) {
        const token = await getCurrentUserToken();
        if (token) {
            // signed in
            // const token = await user.getIdToken()   // pass true in getIdToken() for force refresh
            // console.log("token: ")
            // console.log(token)
            // localStorage.setItem("verstaanToken", token);
            // console.log("new token", token)
            // // If we don't have a token set in the client application, don't bother sending the request. Just reject with an error response.
            // if (!token) {
            //     throw new ErrorResponse("No token set in local storage", 302);
            // }
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers
            };
            return getResponse(config);
        } else {
            // signed out
            throw new ErrorResponse("User is signed out", StatusCode.Unauthorized);
        }
    } else {
        return getResponse(config);
    }
};
