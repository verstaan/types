import { request } from "./index";
import { Login } from "../auth";


export const signIn = (email: string, password: string): Promise<Login> =>
request<Login>(false, {
    method: "post",
    url: "/signIn",
    data: {
        email,
        password
    }
});