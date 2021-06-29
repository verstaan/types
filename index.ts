import { Polygon, MultiPolygon, Point } from "geojson";

export interface ViewportBase {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface ContainerToInsert {
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    abbreviation?: string;
}

export interface Container {
    id: number;
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    abbreviation?: string;
}

export interface DefaultRegionToInsert {
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    container_id: number;
}

export interface DefaultRegion {
    id: number;
    area?: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    container_id: number;
}

export interface GeoAttribution {
    container_id?: number;
    default_region_id?: number;
}

export interface ContainerResponseItem {
    containers: Container[];
    default_regions: DefaultRegion[];
}

export interface Viewport extends ViewportBase {
    width: string;
    height: string;
}

export interface PublicInsight {
    id: number;
    container_id: number;
    default_region_id?: number;
    title: string;
    content: Map<string, string | string[]>;
    created_at: Date;
}

export interface NewPublicInsight {
    container_id: number;
    default_region_id?: number;
    title: string;
    content: Map<string, string>;
}

export interface Dropdown {
    label: string;
    type: "dropdown";
    options: string[];
    value: string | null;
}

export interface ShortString {
    label: string;
    type: "short_string";
    value: string | null;
}

export interface LongString {
    label: string;
    type: "long_string";
    value: string | null;
}

export interface NumberField {
    label: string;
    type: "number";
    value: number | null;
    units?: string;
}

export interface Tickbox {
    label: string;
    type: "tickbox";
    value: true | false | null;
}

export type TEMPLATE_FIELD = Dropdown | ShortString | LongString | NumberField | Tickbox;
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
export interface SubscriptionData {
    user_id: number | undefined;
    client_id: number | undefined;
    token: string | undefined;
    device_type: string | undefined;
    device_fingerprint: string | undefined;
    point: Point | undefined;
    modified_at: Date | undefined;
}

export enum Status {
    SUCCESS,
    ERROR,
  }
