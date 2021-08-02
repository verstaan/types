import { Point } from "geojson";


/**
 *
 * Defines types relevant to authenticating client users, managing push notification subscriptions
 *
 */

export interface Login {
    iat: number;
    exp: number;
    token: string;
}

export interface Device {
    user_id: number;
    client_id: number;
    token: string | null;
    device_type: DeviceType;
    device_fingerprint: string;
    point?: Point;
    modified_at?: Date;
}

export interface DisplayDevice {
    user_id: number;
    client_id: number;
    token: string | null;
    device_type: DeviceType;
    device_fingerprint: string;
    point?: Point;
    modified_at?: Date;
    user_name?: string;
    team_id?: number;
    active_sos?: boolean;
}

export type DeviceType = "Web" | "Mobile";

export interface DeviceSubscription {
    token: string;
    device_type: DeviceType;
    device_fingerprint: string;
    point?: Point;
    modified_at?: Date;
}
