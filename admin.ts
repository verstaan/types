import {Client} from "./client";

export interface Log {
    timestamp: Date;
    user_id?: number;
    client_id?: number;
    admin_user_id?: number;
    route: string;
}

export enum AdminPrivileges {
    MANAGER = 0,
    SUPERUSER = 1,
}

export interface NewClient {
    name: string;
    primary_email: string;
    licenses: number;
    containers: string[];
}

export type ClientUpdate = Partial<Omit<Client, "id" | "created_at">> & { id: Client["id"] };
