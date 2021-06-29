import { NewClient } from "../client";
import { request } from "./index";

export const createClient = (client: NewClient): Promise<void> => request<void>(false, {
    method: "post",
    url: "/admin/createClient",
    data: client
});
