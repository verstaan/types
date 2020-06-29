import { GeoJsonObject, Point } from "geojson";
import { Request } from "restify";
import { AdminPrivileges } from "./adminPrivileges";

export type ClientReportType =
    | "Shooting"
    | "Theft"
    | "Protest"
    | "Emergency Response";

export type ClientReportActions =
    | "Assisting"
    | "Observing"
    | "Coordinating"
    | "Following"
    | "No Actions";

export type ClientReportNeeds =
    | "Exfil"
    | "MedEvac"
    | "CasEvac"
    | "Police"
    | "Fire";

export type PublicReportType =
    | "Protest"
    | "Gang Activity"
    | "Dangerous Terrain"
    | "Roadblock/checkpoint"
    | "Emergency Response"
    | "Theft"
    | "Violent Crime"
    | "Shooting"
    | "Assault"
    | "Other";

export type CategoryTypes = "Violent" | "Non-Violent" | "Hazard" | "Other";
export type ViolentCategory =
    | "Gang Activity"
    | "Assault"
    | "Shooting"
    | "Violent Crime";
export type NonViolentCategory = "Protest" | "Emergency Response" | "Theft";
export type HazardCategory = "Dangerous Terrain" | "Roadblock/checkpoint";
export type OtherCategory = "Other";

export const ReportCategories: Record<
    CategoryTypes,
    Array<ViolentCategory | NonViolentCategory | HazardCategory | OtherCategory>
> = {
    Violent: ["Gang Activity", "Assault", "Shooting", "Violent Crime"],
    "Non-Violent": ["Protest", "Emergency Response", "Theft"],
    Hazard: ["Dangerous Terrain", "Roadblock/checkpoint"],
    Other: ["Other"],
};

export type PublicReportSourceType =
    "Client" |
    "VAMP" | // for old VAMP reports
    "AAMP" |
    "Open Source";

export type Setting = "Sea" | "Land";

export type Actor =
    | "Local Civilian"
    | "International/Visiting/Foreign Civilian"
    | "Company"
    | "Government"
    | "Police"
    | "Military"
    | "Gang"
    | "Militia"
    | "Protestor";

export type Target =
    | "Local Civilian"
    | "International/Visiting/Foreign Civilian"
    | "Company"
    | "Government"
    | "Police"
    | "Military"
    | "Gang"
    | "Charity"
    | "Emergency Services"
    | "Place of Worship"
    | "Educational Facility"
    | "Critical Infrastructure";

export type WeaponType = "Small" | "Medium" | "Heavy";

export type Review = boolean | null; // true is approved, false is rejected, null is not yet reviewed

export type AutoVerificationFailure = "photo-metadata-location" | "photo-metadata-missing";

export interface UserProfile {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: number;
    client_id: number;
    current_container?: number;
}

export interface AdminUserProfile {
    id: number;
    email: string;
    password: string;
    privileges: AdminPrivileges;
    first_name: string;
    last_name: string;
}

export interface Client {
    id: number;
    name: string;
    primary_email: string;
    licenses: number;
    created_at: Date;
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

export type DeviceType = "Web" | "Mobile";

export interface DeviceSubscription {
    token: string;
    device_type: DeviceType;
    device_fingerprint: string;
    point?: Point;
    modified_at?: Date;
}

export interface Container {
    id: number;
    area: GeoJsonObject;
    name: string;
}

export interface DefaultRegion {
    id: number;
    area: GeoJsonObject;
    name: string;
    container_id: number;
}

export interface GeoAttribution {
    container_id?: number;
    default_region_id?: number;
}

/**
 * New types submitted to endpoints to be processed by API
 */

export type NewPrivateReport = NewClientReport | NewClientAlertReport;

export interface NewOsReport {
    date_time: Date;
    point: Point;
    address?: string;
    report_type: PublicReportType;
    description: string;
    photo_url?: string;
    verified?: number;
}

/**
 * Fields of an AAMP that can be customized with the "fields" property of a Form.
 */
export interface AampReportFieldsSpecification {
    aamp_report_type: {
        optional?: false,
        values: Record<PublicReportType, string[]>
    };
    [key: string]: {
        optional?: boolean,
        values: Record<string, string[]> | string[]
    };
}

export interface NewForm {
    container_id: number;
    primary_manager: number;
    fields: AampReportFieldsSpecification;
}

export interface NewVampReport {
    created_at: Date;
    date_time: Date;
    point: Point;
    address?: string;
    description: string;
    report_type: PublicReportType;
    verified: number;
}

export interface AampReportFields {
    aamp_report_type: string;
    [key: string]: string;
}

export interface NewPendingAampReport {
    form_id: number;
    first_name: string;
    last_name: string;
    date_time: Date;
    address?: string;
    description: string;
    media: string[];
    point: Point;
    fields: AampReportFields;
}

export interface NewClientReport {
    date_time: Date;
    point: Point;
    address?: string;
    report_type: ClientReportType;
    report_actions: ClientReportActions;
    report_needs: ClientReportNeeds;
}

export interface NewClientAlertReport {
    date_time: Date;
    point: Point;
    address?: string;
}

export interface AlertReportUpdate {
    report_type?: ClientReportType;
    report_actions?: ClientReportActions;
    report_needs?: ClientReportNeeds;
}

/**
 * Public Report returned from API
 */
export interface PublicReport {
    id: number;
    created_at: Date;
    date_time: Date;
    point: Point;
    address?: string;
    report_type: PublicReportType;
    source_type: PublicReportSourceType;
    client_id?: number;
    source?: string;
    description?: string;
    verified: number;
    container_id?: number;
    default_region_id?: number;
    actor?: Actor;
    target?: Target;
    photo_url?: string;
}

/**
 * Client Report received from api
 */
export interface ClientReport {
    id: number;
    client_id: number;
    user_id: number;
    created_at: Date;
    date_time: Date;
    point: Point;
    address?: string;
    report_type: ClientReportType;
    report_actions: ClientReportActions;
    report_needs: ClientReportNeeds;
    container_id?: number;
    default_region_id?: number;
    custom_region_ids?: number;
    photoUrl?: string;
    full_report_id: number;
}

/**
 * Client Alert Report received from api
 */
export interface ClientAlertReport {
    id: number;
    client_id: number;
    user_id: number;
    created_at: Date;
    date_time: Date;
    point: Point;
    address?: string;
    report_type: ClientReportType;
    report_actions?: ClientReportActions;
    report_needs: ClientReportNeeds;
    confirmed: number;
    container_id?: number;
    default_region_id?: number;
    custom_region_ids?: number;
    photoUrl?: string;
    full_report_id: number;
}

/**
 * Form received from API
 */
export interface Form extends NewForm {
    id: number;
    domains: string[];
}

/**
 * Pending AAMP Report received from API
 */
export interface PendingAampReport extends NewPendingAampReport {
    id: number;
    manager_review: Review;
    super_user_review: Review;
    photo_metadata_point?: Point;
    auto_verification_failure?: AutoVerificationFailure[];
    public_report_id?: number;
    created_at: Date;
}

export type PendingAampReportUpdate = Partial<Omit<PendingAampReport, "fields">> & {
    id: number;
    fields?: Partial<AampReportFields>;
};

/**
 * Map specifying minimum privileges required to update fields of a PendingAampReport:
 * Fields not present cannot be updated.
 */
export const AampUpdateMinimumPrivileges: {
    [P in keyof PendingAampReport]?: AdminPrivileges;
} = {
    manager_review: AdminPrivileges.MANAGER,
    super_user_review: AdminPrivileges.SUPERUSER,
    address: AdminPrivileges.MANAGER,
    date_time: AdminPrivileges.MANAGER,
    description: AdminPrivileges.MANAGER,
    point: AdminPrivileges.MANAGER,
    fields: AdminPrivileges.MANAGER
};

/**
 * Public Report to be added to DB
 */
export interface PublicReportToInsert {
    created_at?: Date;
    date_time: Date;
    point: Point;
    address?: string;
    report_type: PublicReportType;
    source_type: PublicReportSourceType;
    description?: string;
    verified?: number;
    client_id?: number;
    container_id?: number;
    default_region_id?: number;
    photo_url?: string;
    actor?: Actor;
    target?: Target;
}

/**
 * Quick Client Report to be added to DB
 */
export interface ClientReportToInsert {
    client_id: number;
    user_id: number;
    date_time: Date;
    point: Point;
    address?: string;
    report_type: ClientReportType;
    report_actions: ClientReportActions;
    report_needs: ClientReportNeeds;
    container_id?: number;
    default_region_id?: number;
    custom_region_ids?: number;
    photo_url?: string;
}

/**
 * Quick Client Alert Report to be added to DB
 */
export interface ClientAlertReportToInsert {
    client_id: number;
    user_id: number;
    date_time: Date;
    point: Point;
    address?: string;
    container_id?: number;
    default_region_id?: number;
    custom_region_ids?: number;
    photo_url?: string;
}

/**
 * Abstract interface that all session classes implement
 */
export interface ISession {
    email: string;
    id: number;
    session_type: string;
}

// From the db
export interface FullClientReport {
    id: number;
    setting: Setting;
    quick_report_id?: number;
    alert_report_id?: number;
    modified_at: Date;
    client_id: number;
    //Part A: Transportation Details (based on setting)
    ship_name?: string;
    ship_IMO_number?: number;
    ship_flag?: string;
    ship_type?: string;
    ship_tonnages_GRT?: number;
    ship_tonnages_NRT?: number;
    ship_tonnages_DWT?: number;
    ship_owner_name?: string;
    ship_owner_contact?: string;
    ship_manager_name?: string;
    ship_manager_contact?: string;
    ship_last_port?: string;
    ship_next_port?: string;
    ship_cargo_type?: string;
    ship_cargo_quantity?: number;
    vehicle_shape?: string;
    vehicle_color?: string;
    vehicle_registration?: string;
    vehicle_identifiers?: string;
    vehicle_makemodel?: string;
    //Part B: Incident Details
    nearest_landmark?: string;
    ship_port_town?: string;
    vehicle_town?: string;
    country?: string;
    ship_status?: number;
    ship_speed?: number;
    ship_freeboard?: string;
    weather_conditions?: string;
    weather_wind_speed?: number;
    weather_wind_direction?: string;
    ship_weather_sea?: string;
    ship_weather_swell?: string;
    crew_injuries?: string;
    items_stolen?: string;
    ship_area_attacked?: string;
    enemy_situation_description?: string;
    personal_situation_description?: string;
    admin_points?: string;
    other_details?: string;
    //Part C: Details of Raiding Party
    number_of_perps?: number;
    perp_age?: string;
    perp_build?: string;
    perp_clothes?: string;
    perp_distinguishing_marks?: string;
    perp_elevation?: string;
    perp_face?: string;
    perp_gait?: string;
    perp_hair?: string;
    language?: string;
    ship_craft_used?: string;
    vehicle_craft_used?: string;
    closest_point_approach?: string;
    method_approach?: string;
    attack_duration?: number;
    aggression?: string;
    //Part D: Details Weapons and Damage
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
    //Part E: Other Details
    ship_action_taken?: string;
    vehicle_action_taken?: string;
    incident_reported_authorities?: string;
    action_by_authorities?: string;
    priv_security_embarked?: number;
    priv_security_armed?: number;
    ship_crew_amount?: number;
    ship_crew_nationality?: string;
    vehicle_crew_amount?: number;
    vehicle_crew_nationality?: string;
    actor?: Actor;
    target?: Target;
}


/**
 * Creating a Full Client Report
 */
export interface FullClientReportToInsert {
    //MUST PASS IN SETTING, A QUICK REPORT ID, AND TIME OF MODIFICATION
    setting: Setting;
    quick_report_id?: number;
    alert_report_id?: number;
    modified_at: Date;
    client_id: number;
    //Part A: Transportation Details (based on setting)
    ship_name?: string;
    ship_IMO_number?: number;
    ship_flag?: string;
    ship_type?: string;
    ship_tonnages_GRT?: number;
    ship_tonnages_NRT?: number;
    ship_tonnages_DWT?: number;
    ship_owner_name?: string;
    ship_owner_contact?: string;
    ship_manager_name?: string;
    ship_manager_contact?: string;
    ship_last_port?: string;
    ship_next_port?: string;
    ship_cargo_type?: string;
    ship_cargo_quantity?: number;
    vehicle_shape?: string;
    vehicle_color?: string;
    vehicle_registration?: string;
    vehicle_identifiers?: string;
    vehicle_makemodel?: string;
    //Part B: Incident Details
    nearest_landmark?: string;
    ship_port_town?: string;
    vehicle_town?: string;
    country?: string;
    ship_status?: number;
    ship_speed?: number;
    ship_freeboard?: string;
    weather_conditions?: string;
    weather_wind_speed?: number;
    weather_wind_direction?: string;
    ship_weather_sea?: string;
    ship_weather_swell?: string;
    crew_injuries?: string;
    items_stolen?: string;
    ship_area_attacked?: string;
    enemy_situation_description?: string;
    personal_situation_description?: string;
    admin_points?: string;
    other_details?: string;
    //Part C: Details of Raiding Party
    number_of_perps?: number;
    perp_age?: string;
    perp_build?: string;
    perp_clothes?: string;
    perp_distinguishing_marks?: string;
    perp_elevation?: string;
    perp_face?: string;
    perp_gait?: string;
    perp_hair?: string;
    language?: string;
    ship_craft_used?: string;
    vehicle_craft_used?: string;
    closest_point_approach?: string;
    method_approach?: string;
    attack_duration?: number;
    aggression?: string;
    //Part D: Details Weapons and Damage
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
    //Part E: Other Details
    ship_action_taken?: string;
    vehicle_action_taken?: string;
    incident_reported_authorities?: string;
    action_by_authorities?: string;
    priv_security_embarked?: number;
    priv_security_armed?: number;
    ship_crew_amount?: number;
    ship_crew_nationality?: string;
    vehicle_crew_amount?: number;
    vehicle_crew_nationality?: string;
    actor?: Actor;
    target?: Target;
}

/*
  Updating a full client report
*/
export interface FullClientReportUpdate {
    //MUST PASS IN SETTING, REPORT ID, AND TIME OF MODIFICATION
    setting: Setting;
    full_report_id: number;
    modified_at: Date;
    photo_url?: string;
    //Part A: Transportation Details (based on setting)
    ship_name?: string;
    ship_IMO_number?: number;
    ship_flag?: string;
    ship_type?: string;
    ship_tonnages_GRT?: number;
    ship_tonnages_NRT?: number;
    ship_tonnages_DWT?: number;
    ship_owner_name?: string;
    ship_owner_contact?: string;
    ship_manager_name?: string;
    ship_manager_contact?: string;
    ship_last_port?: string;
    ship_next_port?: string;
    ship_cargo_type?: string;
    ship_cargo_quantity?: number;
    vehicle_shape?: string;
    vehicle_color?: string;
    vehicle_registration?: string;
    vehicle_identifiers?: string;
    vehicle_makemodel?: string;
    //Part B: Incident Details
    nearest_landmark?: string;
    ship_port_town?: string;
    vehicle_town?: string;
    country?: string;
    ship_status?: number;
    ship_speed?: number;
    ship_freeboard?: string;
    weather_conditions?: string;
    weather_wind_speed?: number;
    weather_wind_direction?: string;
    ship_weather_sea?: string;
    ship_weather_swell?: string;
    crew_injuries?: string;
    items_stolen?: string;
    ship_area_attacked?: string;
    enemy_situation_description?: string;
    personal_situation_description?: string;
    admin_points?: string;
    other_details?: string;
    //Part C: Details of Raiding Party
    number_of_perps?: number;
    perp_age?: string;
    perp_build?: string;
    perp_clothes?: string;
    perp_distinguishing_marks?: string;
    perp_elevation?: string;
    perp_face?: string;
    perp_gait?: string;
    perp_hair?: string;
    language?: string;
    ship_craft_used?: string;
    vehicle_craft_used?: string;
    closest_point_approach?: string;
    method_approach?: string;
    attack_duration?: number;
    aggression?: string;
    //Part D: Details Weapons and Damage
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
    //Part E: Other Details
    ship_action_taken?: string;
    vehicle_action_taken?: string;
    incident_reported_authorities?: string;
    action_by_authorities?: string;
    priv_security_embarked?: number;
    priv_security_armed?: number;
    ship_crew_amount?: number;
    ship_crew_nationality?: string;
    vehicle_crew_amount?: number;
    vehicle_crew_nationality?: string;
    actor?: Actor;
    target?: Target;
}

// Hierarchy of the full client report
export interface FullClientReportSections {
    transportationSection?:
    | ClientReportSeaTransportationSection
    | ClientReportLandTransportationSection;
    incidentSection?:
    | ClientReportSeaIncidentSection
    | ClientReportLandIncidentSection;
    perpSection?: ClientReportSeaPerpSection | ClientReportLandPerpSection;
    weaponSection?: ClientReportWeaponSection;
    otherSection?: ClientReportSeaOtherSection | ClientReportLandOtherSection;
}

// Different components of a full report
export interface ClientReportSeaTransportationSection {
    ship_name?: string;
    ship_IMO_number?: number;
    ship_flag?: string;
    ship_type?: string;
    ship_tonnages_GRT?: number;
    ship_tonnages_NRT?: number;
    ship_tonnages_DWT?: number;
    ship_owner_name?: string;
    ship_owner_contact?: string;
    ship_manager_name?: string;
    ship_manager_contact?: string;
    ship_last_port?: string;
    ship_next_port?: string;
    ship_cargo_type?: string;
    ship_cargo_quantity?: number;
}

export interface ClientReportLandTransportationSection {
    vehicle_shape?: string;
    vehicle_color?: string;
    vehicle_registration?: string;
    vehicle_identifiers?: string;
    vehicle_makemodel?: string;
}

export interface ClientReportSeaIncidentSection {
    nearest_landmark?: string;
    ship_port_town?: string;
    country?: string;
    ship_status?: number;
    ship_speed?: number;
    ship_freeboard?: string;
    weather_conditions?: string;
    weather_wind_speed?: number;
    weather_wind_direction?: string;
    ship_weather_sea?: string;
    ship_weather_swell?: string;
    crew_injuries?: string;
    items_stolen?: string;
    ship_area_attacked?: string;
    enemy_situation_description?: string;
    personal_situation_description?: string;
    admin_points?: string;
    other_details?: string;
}

export interface ClientReportLandIncidentSection {
    nearest_landmark?: string;
    vehicle_town?: string;
    country?: string;
    weather_conditions?: string;
    weather_wind_speed?: number;
    weather_wind_direction?: string;
    crew_injuries?: string;
    items_stolen?: string;
    enemy_situation_description?: string;
    personal_situation_description?: string;
    admin_points?: string;
    other_details?: string;
}

export interface ClientReportSeaPerpSection {
    number_of_perps?: number;
    perp_details_AH?: perpDetails;
    language?: string;
    ship_craft_used?: string;
    closest_point_approach?: string;
    method_approach?: string;
    attack_duration?: number;
    aggression?: string;
}

export interface ClientReportLandPerpSection {
    number_of_perps?: number;
    perp_details_AH?: perpDetails;
    language?: string;
    vehicle_craft_used?: string;
    closest_point_approach?: string;
    method_approach?: string;
    attack_duration?: number;
    aggression?: string;
}

export interface ClientReportWeaponSection {
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
}

export interface ClientReportSeaOtherSection {
    ship_action_taken?: string;
    incident_reported_authorities?: string;
    action_by_authorities?: string;
    priv_security_embarked?: number;
    priv_security_armed?: number;
    ship_crew_amount?: number;
    ship_crew_nationality?: string;
    actor?: Actor;
    target?: Target;
}

export interface ClientReportLandOtherSection {
    vehicle_action_taken?: string;
    incident_reported_authorities?: string;
    action_by_authorities?: string;
    priv_security_embarked?: number;
    priv_security_armed?: number;
    vehicle_crew_amount?: number;
    vehicle_crew_nationality?: string;
    actor?: Actor;
    target?: Target;
}

export interface perpDetails {
    perp_age?: string;
    perp_build?: string;
    perp_clothes?: string;
    perp_distinguishing_marks?: string;
    perp_elevation?: string;
    perp_face?: string;
    perp_gait?: string;
    perp_hair?: string;
}

export type ReportNotificationType = "Public" | "Quick" | "Alert" | "Alert-Update" | "Alert-Cancel" | "Alert-Confirm";

export interface ReportNotificationData {
    type: ReportNotificationType;
    id: string;
}

export interface CombinedClientReportItem {
    id: number;
    type: "Quick" | "Alert";
    report: ClientReport | ClientAlertReport;
    full_report?: FullClientReport;
}

/**
 * For front-end organization
 */
export interface FullClientReportSections {
    transportationSection?: ClientReportSeaTransportationSection | ClientReportLandTransportationSection;
    incidentSection?: ClientReportSeaIncidentSection | ClientReportLandIncidentSection;
    perpSection?: ClientReportSeaPerpSection | ClientReportLandPerpSection;
    weaponSection?: ClientReportWeaponSection;
    otherSection?: ClientReportSeaOtherSection | ClientReportLandOtherSection;
}

/**
 * Sherlock Analytics Types
 */

export class WeeklyOverallStats {
    public totalWeekCount: number | undefined;
    public changeTotalWeek: string | undefined;
    public amountChangeTotalWeek: number | undefined;

    constructor(init?: Partial<WeeklyOverallStats>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.totalWeekCount !== undefined &&
            this.changeTotalWeek !== undefined &&
            this.amountChangeTotalWeek !== undefined
        )
    }
}

export class MonthlyOverallStats {
    public totalMonthCount: number | undefined;
    public changeTotalMonth: string | undefined;
    public amountChangeTotalMonth: number | undefined;
    constructor(init?: Partial<MonthlyOverallStats>) {
        Object.assign(this, init);
    }
    checkInfo(): boolean {
        return (
            this.totalMonthCount !== undefined &&
            this.changeTotalMonth !== undefined &&
            this.amountChangeTotalMonth !== undefined
        )
    }
}

export class StatsPerCategory {
    public name: string | undefined;
    public count: number | undefined;
    public change: string | undefined;
    public amountChange: number | undefined;
    constructor(init?: Partial<StatsPerCategory>) {
        Object.assign(this, init);
    }
    checkInfo(): boolean {
        return (
            this.name !== undefined &&
            this.name !== "" &&
            this.count !== undefined &&
            this.change !== undefined &&
            this.amountChange !== undefined
        )
    }
}

export class ThirtyDayCount {
    public dateTime: string | undefined;
    public dayName: string | undefined;
    public count: number | undefined;
    constructor(init?: Partial<ThirtyDayCount>) {
        Object.assign(this, init);
    }
    checkInfo(): boolean {
        return (
            this.dateTime !== undefined &&
            this.dayName !== undefined &&
            this.count !== undefined
        )
    }
}
export class Analytics {
    public weeklyOverallStats: WeeklyOverallStats | undefined;
    public monthlyOverallStats: MonthlyOverallStats | undefined;
    public weeklyStatsPerCategory: StatsPerCategory[] | undefined;
    public monthlyStatsPerCategory: StatsPerCategory[] | undefined;
    public thirtyDayCount: ThirtyDayCount[] | undefined;
    constructor(init?: Partial<Analytics>) {
        Object.assign(this, init);
    }
    checkInfo(): boolean {
        return (
            this.weeklyOverallStats !== undefined &&
            this.weeklyStatsPerCategory !== undefined &&
            this.monthlyOverallStats !== undefined &&
            this.monthlyStatsPerCategory !== undefined &&
            this.thirtyDayCount !== undefined
        )
    }
}

