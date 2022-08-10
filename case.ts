import { LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from "geojson";

/**
 *
 *  Defines types relevant to CASe Asset/Risk Management
 *
 */


 export interface CaseUserProfile {
    id: number;
    email: string;
    password: string;
    privileges: CasePrivileges;
    first_name: string;
    last_name: string;
    phone_primary?: string;
    client_id: number;
}

export enum CasePrivileges {
    MANAGER = 0,
    SUPERUSER = 1
}


export interface NewCaseUser {
    email: string;
    first_name: string;
    last_name: string;
    password: string | undefined;
    privileges: CasePrivileges | undefined;
    phone_primary?: string;
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
    id: number;
    name: string;
    asset_type: string;
    client_id?: number;
    group_id?: number;
    description?: string;
    geography: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
    operation_interval?: {'weekdays': string[], 'time_bins': string[]};
    concerns?: AssetConcern[];
    relevant_event_types?: string[];
    value?: number;
    details?: JSON;
    erp_link?: string;
    container_ids?: number[];
    default_region_ids?: number[];
    scenario_asset_id?: number;
    imaginary: boolean;
    optimal?: boolean;
    needs_review?: boolean;
    arcturus_gen: boolean;
    created_at: Date;
}

export interface AdminNewAsset {
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
    container_ids?: number[];
    default_region_ids?: number[];
    scenario_asset_id?: number;
    imaginary: boolean;
    optimal?: boolean;
    needs_review?: boolean;
    arcturus_gen: boolean;
}

export interface ClientNewAsset {
    name: string;
    asset_type: string;
    team_id?: number;
    description?: string;
    geography: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
    operation_interval?: string;
    concerns?: AssetConcern[];
    relevant_event_types?: string[];
    value?: number;
    details?: JSON;
    erp_link?: string;
    imaginary: boolean;
    scenario_asset_id?: number;
}

export interface Forecast {
    date: Date;
    h3_cell: string;
    risk_score: number;
    risk_index: number;
}

export interface Risk {
    asset_ids: number[];
    name: string;
    id: number;
    relevant_event_types: string[];
    risk_interval: {'weekdays': string[], 'time_bins': string[]};
    created_at?: Date;
    severity: any[];
    chance: number;
    updates: RiskUpdate[];
    geography?: Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | string[];
    concerns: AssetConcern[]; // "Profitability" (See below definition)
    consequences: Consequence[]; // see below definition
    is_obsolete: boolean; // "true" indicates this risk is no longer relevant
    container_ids?: number[]; // Applicable container(s)
    default_region_ids?: number[]; // Applicable region(s)
    suggestions: string;
    comments: string;
    needs_review?: boolean;
}

export interface RiskUpdate {
    modified_at: Date;
}

export interface Consequence {
    asset_ids: number[];
    concern: AssetConcern; // "Profitability"
    magnitude: number; // 100,000 (USD)
    timeframe: string; // "Week" (default)
    probability: number; // Chance of occurrence
}

export interface AssetRiskQuery {
    assets: Asset[];
    risks: Risk[];
}

export type AssetConcern = "Profitability" | "Damage/Loss" | "Safety/Harm" | "Operations/Downtime" | "Reputation" | "Environmental";

export const AllAssetConcerns: AssetConcern[] = ["Profitability", "Damage/Loss", "Safety/Harm", "Operations/Downtime", "Reputation", "Environmental"];

export interface Association {
    id: number;
    obj1_id: number;
    obj1_category: string;
    obj2_id: number;
    obj2_category: string;
    notes: string | null;
}

export interface Severity {
    weekday: string;
    time_bin: string;
    risk_score: number;
    risk_index: number;
}

export interface Group {
    id: number;
    name: string;
    client_id: number;
}