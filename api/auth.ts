import { request } from "./index";
import { Login } from "../auth";
import { PendingUser, UserSignUp } from "../client";

export const signIn = (email: string, password: string): Promise<Login> =>
    request<Login>(false, {
        method: "post",
        url: "/auth/signIn",
        data: {
            email,
            password
        }
    });

export const resetPassword = (email: string, code: string, newPassword: string): Promise<void> =>
    request<void>(false, {
        method: "post",
        url: "/auth/resetPassword",
        data: {
            email,
            code,
            newPassword
        }
    });

// forgotPassword is not yet implemented on the Jarvis side
export const forgotPassword = (email: string, isPhone: boolean): Promise<any> =>
    request<any>(false, {
        method: "post",
        url: "/auth/forgotPassword",
        data: {
            email,
            isPhone
        }
    });

export const signUp = (email: string, password: string, firstname: string, lastname: string, client_id: number, role?: number): Promise<void> =>
    request<void>(false, {
        method: "post",
        url: "/auth/signUp",
        data: {
            email,
            password,
            firstname,
            lastname,
            client_id,
            role
        }
    });

export const changePassword = (oldPassword: string, newPassword: string): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/auth/changePassword",
        data: {
            oldPassword,
            newPassword
        }
    });

export const getPendingUserByEmail = (email: string, fingerprint?: string) =>
    request<PendingUser | null>(false, {
        method: "post",
        url: "/auth/signUp/getPendingUserByEmail",
        data: {
            email,
            fingerprint
        }
    });

export const getPendingUserByPhone = (phone: string, fingerprint?: string) =>
    request<PendingUser>(false, {
        method: "post",
        url: "/auth/signUp/getPendingUserByPhone",
        data: {
            phone,
            fingerprint
        }
    });

export const verifyEmail = (email: string, verif_code: number) =>
    request<PendingUser>(false, {
        method: "post",
        url: "/auth/signUp/verifyEmail",
        data: {
            email,
            verif_code
        }
    });

export const signUpPendingUser = (uuid: string, signUp: UserSignUp) =>
    request<Login>(false, {
        method: "post",
        url: "/auth/signUp/pendingUser",
        data: {
            uuid,
            signUp
        }
    });

export const getPendingUserByToken = (uuid: string) =>
    request<PendingUser>(false, {
        method: "post",
        url: "/auth/signUp/getPendingUserByToken",
        data: {
            uuid
        }
    });

export const adminSignIn = (email: string, password: string): Promise<Login> =>
    request<Login>(false, {
        method: "POST",
        url: "/auth/adminSignIn",
        data: { email, password }
    });

export const travelSignIn = (email: string, password: string): Promise<Login> =>
    request<Login>(false, {
        method: "post",
        url: "/auth/travelSignIn",
        data: {
            email,
            password
        }
    });

export const travelForgotPassword = (email: string, isPhone: boolean): Promise<any> =>
    request<any>(false, {
        method: "post",
        url: "/auth/travelForgotPassword",
        data: {
            email,
            isPhone
        }
    });