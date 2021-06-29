import { Point } from "geojson";

export interface Device {
    user_id: number;
    client_id: number;
    token: string | null;
    device_type: DeviceType;
    device_fingerprint: string;
    point?: Point;
    modified_at?: Date;
}

export type DeviceType = "Web" | "Mobile";

export interface DeviceSubscription {
    token: string;
    device_type: DeviceType;
    device_fingerprint: string;
    point?: Point;
    modified_at?: Date;
}

export interface Login {
    iat: number;
    exp: number;
    token: string;
}
