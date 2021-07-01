
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