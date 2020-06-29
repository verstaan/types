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

    InternalServerError = 500,
}
