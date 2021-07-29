import { Client, Profile, UserFeatureSelection} from "./client";
import { GeoJsonGeometryTypes, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from "geojson";
import { ViewportBase } from "./geo";


/**
 *
 *  Defines types relevant to administrative users interacting directly with Jarvis API/Jarvis Admin.
 *
 */

 export type AssetConcern = 
 | "Profitability" 
 | "Damage/Loss" 
 | "Safety/Harm" 
 | "Operations/Downtime" 
 | "Reputation" 
 | "Environmental";

export const AllAssetConcerns : AssetConcern[] = [
 "Profitability",
 "Damage/Loss",
 "Safety/Harm",
 "Operations/Downtime",
 "Reputation",
 "Environmental"
];

export interface AdminUserProfile {
    id: number;
    email: string;
    password: string;
    privileges: AdminPrivileges;
    first_name: string;
    last_name: string;
    phone_primary?: string;
    features?: AdminFeatureSelection | null;
}

export enum AdminPrivileges {
    MANAGER = 0,
    SUPERUSER = 1,
}

export interface AdminFeatureSelection {
    admin?: boolean | null;
    client?: boolean | null;
    areas?: boolean | null;
    logs?: boolean | null;
    aamp?: boolean | null;
}

export interface NewAdminUser {
    email: string;
    first_name: string;
    last_name: string;
    password: string | undefined;
    privileges: AdminPrivileges | undefined;
    features?: AdminFeatureSelection | undefined;
}

export interface Log {
    timestamp: Date;
    user_id?: number;
    client_id?: number;
    admin_user_id?: number;
    route: string;
}

export interface ClientCreation {
    client: NewClient;
    user: NewUser;
    invite: boolean;
}

export interface NewClient {
    name: string;
    primary_email: string;
    licenses: number;
    containers: string[]
}

export interface NewUser {
    email: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    password: string | undefined;
    client_id: number | undefined;
    team_id?: number | null | undefined;
    role: number | undefined;
    designation: string | null | undefined;
    profile: Profile | null | undefined;
    features: UserFeatureSelection | null | undefined;
}


export type ClientUpdate = Partial<Omit<Client, "id" | "created_at">> & { id: Client["id"] };

export interface ClientContainers {
    client_id: number;
    containers: string[];
}

export interface NewContainer {
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    abbreviation?: string;
}

export interface NewDefaultRegion {
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    container_id: number;
}

export interface NewTeamAdmin {
    client_id: number;
    name: string;
    address?: string;
    permissions?: number;
}

export interface ChatFormLink {
    id: number; // Chat ID
    form_id: number;
}

export interface AssetType {
    name: string;
    description: string;
    category: string;
    relevant_event_types: string[];
    relevant_concerns: string[];
    relevant_geographies: string[];
    mobile: boolean;
}

export interface Asset {
    name: string;
    asset_type: string;
    client_id?: number;
    team_id?: number;
    description?: string;
    geography: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
    operation_interval?: string;
    concerns?: AssetConcern[];
    relevant_event_types?: string[];
    value?: number;
    details?: JSON;
    erp_link?: string;
}

export interface AssetToInsert extends Asset{
    container_id: number[];
    default_region_id: number[];
}

export interface Consequence {
    concern: AssetConcern;
    magnitude: number;
    timeframe: string;
}

export interface Risk {
    asset_id: number;
    concern: AssetConcern;
    consequence: Consequence;
    relevant_event_types: string[];
    risk_interval: string;
    created_at: Date;
    severity: number;
    chance: number;
    isObsolete: boolean;
    updates: string[];
    geography: JSON;
}