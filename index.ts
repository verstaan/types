import { MultiPolygon, Point, Polygon } from "geojson";
import { AdminPrivileges } from "./adminPrivileges";

export type reportType =
    | "Shooting"
    | "Theft"
    | "Auto Theft"
    | "Protest"
    | "Emergency Response"
    | "Gang Activity"
    | "Dangerous Terrain"
    | "Roadblock"
    | "Violent Crime"
    | "Assault"
    | "Homicide"
    | "Hijacking"
    | "Smash and Grab"
    | "Home Invasion"
    | "Corruption"
    | "Drugs"
    | "Stabbing" // new
    | "Abduction"
    | "Rocket Attack"
    | "Coordinated Attack"
    | "Explosive Weapon"
    | "Harassment"
    | "Suspicious Activity"
    | "Suspicious Vehicle"
    | "Suspicious Object"
    | "Fire"
    | "Police"
    | "Police Response"
    | "Checkpoint"
    | "Explosion (Accidental)"
    | "Auto Accident"
    | "Robbery"
    | "Arms & Ammunition"
    | "Terrorism"
    | "Rioting"
    | "Fraud"
    | "Vandalism"
    | "Disorderly Conduct"
    | "Property Damage"
    | "Other";

export const AllReportTypes: reportType[] = [
    "Abduction",
    "Arms & Ammunition",
    "Assault",
    "Auto Accident",
    "Auto Theft",
    "Checkpoint",
    "Coordinated Attack",
    "Corruption",
    "Dangerous Terrain",
    "Disorderly Conduct",
    "Drugs",
    "Emergency Response",
    "Explosion (Accidental)",
    "Explosive Weapon",
    "Fire",
    "Fraud",
    "Gang Activity",
    "Harassment",
    "Hijacking",
    "Home Invasion",
    "Homicide",
    "Police",
    "Police Response",
    "Property Damage",
    "Protest",
    "Roadblock",
    "Robbery",
    "Rioting",
    "Rocket Attack",
    "Shooting",
    "Smash and Grab",
    "Stabbing",
    "Suspicious Activity",
    "Suspicious Object",
    "Suspicious Vehicle",
    "Terrorism",
    "Theft",
    "Vandalism",
    "Violent Crime",
    "Other"
];

export type ClientReportActions = "Assisting" | "Observing" | "Coordinating" | "Following" | "No Actions";

export type ClientReportNeeds = "Extraction" | "MedEvac" | "CasEvac" | "Police" | "Fire";

export type CategoryTypes = "Violent" | "Non-Violent" | "Hazard" | "Other";
export type ViolentCategory =
    | "Gang Activity"
    | "Assault"
    | "Shooting"
    | "Violent Crime"
    | "Homicide"
    | "Hijacking"
    | "Stabbing"
    | "Abduction"
    | "Rocket Attack"
    | "Coordinated Attack"
    | "Explosive Weapon"
    | "Robbery"
    | "Arms & Ammunition"
    | "Terrorism"
    | "Rioting";
export type NonViolentCategory =
    | "Protest"
    | "Emergency Response"
    | "Theft"
    | "Auto Theft"
    | "Smash and Grab"
    | "Home Invasion"
    | "Police Response"
    | "Corruption"
    | "Drugs"
    | "Vandalism"
    | "Disorderly Conduct"
    | "Property Damage"
    | "Fraud"
    | "Harassment";
export type HazardCategory =
    | "Dangerous Terrain"
    | "Roadblock"
    | "Fire"
    | "Police"
    | "Checkpoint"
    | "Explosion (Accidental)"
    | "Auto Accident";
export type OtherCategory = "Other" | "Suspicious Activity" | "Suspicious Vehicle" | "Suspicious Object";
export type EventType = ViolentCategory | NonViolentCategory | HazardCategory | OtherCategory;

export interface Categories {
    Violent: Array<ViolentCategory>;
    "Non-Violent": Array<NonViolentCategory>;
    Hazard: Array<HazardCategory>;
    Other: Array<OtherCategory>;
}

export const ReportCategories: Record<
    CategoryTypes,
    Array<ViolentCategory | NonViolentCategory | HazardCategory | OtherCategory>
> = {
    Violent: [
        "Gang Activity",
        "Assault",
        "Shooting",
        "Violent Crime",
        "Homicide",
        "Hijacking",
        "Stabbing",
        "Abduction",
        "Rocket Attack",
        "Coordinated Attack",
        "Explosive Weapon",
        "Robbery",
        "Arms & Ammunition",
        "Terrorism",
        "Rioting"
    ],
    "Non-Violent": [
        "Protest",
        "Emergency Response",
        "Theft",
        "Smash and Grab",
        "Home Invasion",
        "Corruption",
        "Drugs",
        "Harassment",
        "Police Response",
        "Fraud",
        "Auto Theft",
        "Vandalism",
        "Disorderly Conduct",
        "Property Damage"
    ],
    Hazard: [
        "Dangerous Terrain",
        "Roadblock",
        "Fire",
        "Police",
        "Checkpoint",
        "Explosion (Accidental)",
        "Auto Accident"
    ],
    Other: ["Other", "Suspicious Activity", "Suspicious Vehicle", "Suspicious Object"]
};

export type PublicReportSourceType =
    | "Client"
    | "VAMP" // for old VAMP reports
    | "AAMP"
    | "Open Source";

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

export type ReportClassification =
    | "COVID-19 Entries"
    | "Arrests and Recoveries"
    | "Incidents and Suspicious Activity"
    | "Complaints/Compliments"
    | "Site Visits"
    | "Client Meetings"
    | "Inspections";

export type Review = boolean | null; // true is approved, false is rejected, null is not yet reviewed

export type AutoVerificationFailure = "photo-metadata-location" | "photo-metadata-missing";

export type UserDesignation = "Medic";
export const ValidUserDesignations: UserDesignation[] = ["Medic"];

export interface UserProfile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: number;
    client_id: number;
    current_container?: number;
    phone_primary?: string;
    current_container_mobile?: number;
    current_default_region_mobile?: number;
    team_id?: number | null;
    designation?: string;
    profile?: Profile | null;
    features?: UserFeatureSelection | null;
}

export interface PendingUser {
    uuid: string;
    client_id: number;
    email?: string;
    phone_primary?: string;
    role?: number;
    designation?: string;
    first_name?: string;
    last_name?: string;
    team_id?: number | null;
    profile?: Profile | null;
    features?: UserFeatureSelection | null;
    verif_code?: number | null;
    verif_exp?: Date | null;
    inviting_user_id?: number | null;
}

export interface PendingUserInvite {
    email?: string;
    phone_primary?: string;
    first_name?: string;
    last_name?: string;
    role?: number;
    designation?: string;
    team_id?: number | null;
    features?: UserFeatureSelection;
    inviting_user_id?: number;
}

export interface UserSignUp {
    password: string;
    email?: string;
    phone_primary?: string;
    first_name?: string;
    last_name?: string;
    profile?: Profile;
}

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

export interface Client {
    id: number;
    name: string;
    primary_email: string;
    licenses: number;
    created_at: Date;
    licenses_FC?: number;
    licenses_BC?: number;
    licenses_EC?: number;
    ignored_report_types?: reportType[];
    domain?: string | null;
}

export interface DisplayClient extends Client {
    type: "Client";
    incidents: number,
    alerts: number,
    full_reports: number,
    users: number,
    activity: number
}

export type DisplayTeam = Omit<Team, "id"> & {
    id: number | null;
    type: "Team";
}

export interface DisplayUserProfile extends UserProfile {
    type: "UserProfile";
    incidents: number;
    alerts: number;
    full_reports: number;
    users: number;
    activity: number;
}

export interface ClientDisplayData {
    clientData: DisplayClient[];
    teamData: DisplayTeam[];
    userData: DisplayUserProfile[];
    teamContext: Record<number, Record<number | "null", string>>;
    containerContext: string[];

}

export type ClientProfile = Client;

export type ClientUpdate = Partial<Omit<Client, "id" | "created_at">> & { id: Client["id"] };

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

export interface NewClient {
    name: string;
    primary_email: string;
    licenses: number;
    containers: string[];
}

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

/**
 * New types submitted to endpoints to be processed by API
 */

export type NewPrivateReport = NewClientReport | NewClientAlertReport;

export interface NewOsReport {
    date_time: Date;
    point: Point;
    address?: string;
    report_type: reportType;
    description: string;
    photo_url?: string;
    verified?: number;
}

/**
 * Fields of an AAMP that can be customized with the "fields" property of a Form.
 */
export interface AampReportFieldsSpecification {
    aamp_report_type: {
        optional?: false;
        values: Record<reportType, string[]>;
    };
    [key: string]: {
        optional?: boolean;
        values: Record<string, string[]> | string[];
    };
}

export interface NewForm {
    container_id: number;
    primary_manager: number;
    fields: AampReportFieldsSpecification;
    immediate_public?: boolean;
}

export interface NewVampReport {
    created_at: Date;
    date_time: Date;
    point: Point;
    address?: string;
    description: string;
    report_type: reportType;
    verified: number;
}

export interface AampReportFields {
    aamp_report_type: string;
    [key: string]: string;
}

export interface NewPendingAampReport {
    form_id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    date_time?: Date;
    address?: string;
    description: string;
    chat_messages?: number[];
    source_message?: number;
    bot_generated?: boolean;
    media?: string[];
    point?: Point;
    fields: AampReportFields;
}

export interface NewClientReport {
    date_time: Date;
    point: Point;
    address?: string;
    report_type: reportType;
    report_actions?: ClientReportActions;
    report_needs?: ClientReportNeeds;
    photo_url?: string;
    team_id?: number;
    client_uuid?: string;
}

export interface NewClientAlertReport {
    date_time: Date;
    point: Point;
    address?: string;
    team_id?: number;
}

export interface AlertReportUpdate {
    report_type?: reportType;
    report_actions?: ClientReportActions;
    report_needs?: ClientReportNeeds;
    nine_liner?: NineLiner;
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
    report_type: reportType;
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
    team_id?: number;
    user_id?: number;
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
    report_type: reportType;
    report_actions: ClientReportActions;
    report_needs: ClientReportNeeds;
    container_id?: number;
    default_region_id?: number;
    custom_region_ids?: number;
    photo_url?: string;
    full_report_id: number;
    team_id?: number;
    client_uuid?: string | null;
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
    report_type: reportType;
    report_actions?: ClientReportActions;
    report_needs: ClientReportNeeds;
    confirmed: number;
    ended_at?: Date | null;
    confirmed_at?: Date | null;
    deleted_by?: number;
    deleted_at?: Date;
    container_id?: number;
    default_region_id?: number;
    custom_region_ids?: number;
    photo_url?: string;
    full_report_id: number;
    team_id?: number;
    nine_liner?: NineLiner;
    client_uuid?: string | null;
}

/**
 * Form received from API
 */
export interface Form extends NewForm {
    id: number;
    domains: string[];
    immediate_public: boolean;
}

export interface PendingAampReportToInsert extends NewPendingAampReport {
    photo_metadata_point?: Point;
    auto_verification_failure?: AutoVerificationFailure[];
}

/**
 * Pending AAMP Report received from API
 */
export interface PendingAampReport extends PendingAampReportToInsert {
    id: number;
    manager_review: Review;
    super_user_review: Review;
    archived: boolean;
    public_report_id?: number | null;
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
    fields: AdminPrivileges.MANAGER,
    archived: AdminPrivileges.MANAGER,
    username: AdminPrivileges.MANAGER,
    first_name: AdminPrivileges.MANAGER,
    last_name: AdminPrivileges.MANAGER,
    chat_messages: AdminPrivileges.MANAGER,
    source_message: AdminPrivileges.MANAGER
};

/**
 * Interfaces corresponding to Message and Chat objects from Telegram's Bot API
 */

/**
 * Telegram message as represented in the DB
 */
export interface TelegramMessage {
    message_id: number,
    text: string,
    chat_id: number,
    user_id: number,
    date: number
}

/**
 * Telegram message with user and chat objects embedded.
 * This is the format that Telegram sends its messages in
 */
export interface TelegramMessageDetails extends Omit<TelegramMessage, "chat_id" | "user_id"> {
    from: TelegramUser,
    chat: TelegramChat,
};

export interface TelegramChat {
    id: number,
    type: string,
    title: string,
    form_id?: number
}

export interface TelegramUser {
    id: number,
    username: string,
    first_name: string,
    last_name: string
}

/**
 * Public Report to be added to DB
 */
export interface PublicReportToInsert {
    created_at?: Date;
    date_time: Date;
    point: Point;
    address?: string;
    report_type: reportType;
    source_type: PublicReportSourceType;
    description?: string;
    verified?: number;
    client_id?: number;
    container_id?: number;
    default_region_id?: number;
    photo_url?: string;
    actor?: Actor;
    target?: Target;
    team_id?: number;
    user_id?: number;
    client_report_id?: number;
    alert_report_id?: number;
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
    report_type: reportType;
    report_actions?: ClientReportActions;
    report_needs?: ClientReportNeeds;
    container_id?: number;
    default_region_id?: number;
    custom_region_ids?: number;
    photo_url?: string;
    team_id?: number;
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
    team_id?: number;
    nine_liner?: NineLiner;
    client_uuid?: string;
}

export interface ClientAlertReportToInsertPartial {
    date_time: Date;
    point: Point;
    address?: string;
}

export interface Login {
    iat: number;
    exp: number;
    token: string;
}

/**
 * Abstract interface that all session classes implement
 */
export interface ISession {
    email: string;
    id: number;
    session_type: string;
}

export interface ReportBase {
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
    //Part F: Client Imported Report I
    report_classification?: ReportClassification;
    OB_number?: string;
    category?: string;
    sub_category?: string;
    occurrence_date?: string;
    locality?: string;
    status?: string;
    responsible?: string;
    summary?: string;
}

// From the db
export interface FullClientReport {
    id: number;
    setting?: Setting;
    quick_report_id: number | null;
    alert_report_id: number | null;
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
    //Part F: Client Imported Report I
    report_classification?: ReportClassification;
    OB_number?: string;
    category?: string;
    sub_category?: string;
    occurrence_date?: string;
    locality?: string;
    status?: string;
    responsible?: string;
    summary?: string;
    template_id?: number;
    template_fields?: ReportTemplate;
}

/**
 * Creating a Full Client Report
 */
export interface FullClientReportToInsert {
    //MUST PASS IN SETTING, A QUICK REPORT ID, AND TIME OF MODIFICATION
    setting?: Setting;
    quick_report_id: number | null;
    alert_report_id: number | null;
    client_id: number;
    team_id?: number;
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
    //Part F: Client Imported Report I
    report_classification?: ReportClassification;
    OB_number?: string;
    category?: string;
    sub_category?: string;
    occurrence_date?: string;
    locality?: string;
    status?: string;
    responsible?: string;
    summary?: string;
    template_id?: number;
    template_fields?: ReportTemplate;
}

/*
  Updating a full client report
*/
export interface FullClientReportUpdate {
    //MUST PASS IN SETTING, REPORT ID, AND TIME OF MODIFICATION
    setting?: Setting;
    full_report_id: number;
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
    //Part F: Client Imported Report I
    report_classification?: ReportClassification;
    OB_number?: string;
    category?: string;
    sub_category?: string;
    occurrence_date?: string;
    locality?: string;
    status?: string;
    responsible?: string;
    summary?: string;
    template_id?: number;
    template_fields?: ReportTemplate;
}

// Hierarchy of the full client report
export interface FullClientReportSections {
    transportationSection?: ClientReportSeaTransportationSection | ClientReportLandTransportationSection;
    incidentSection?: ClientReportSeaIncidentSection | ClientReportLandIncidentSection;
    perpSection?: ClientReportSeaPerpSection | ClientReportLandPerpSection;
    weaponSection?: ClientReportWeaponSection;
    otherSection?: ClientReportSeaOtherSection | ClientReportLandOtherSection;
    clientImportedReportOne?: ClientReportImportOne;
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
    closest_point_approach?: string;
    method_approach?: string;
    attack_duration?: number;
    aggression?: string;
}

export interface ClientReportLandPerpSection {
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

export interface ClientReportImportOne {
    report_classification?: ReportClassification;
    OB_number?: string;
    category?: string;
    sub_category?: string;
    occurrence_date?: string;
    locality?: string;
    status?: string;
    responsible?: string;
    summary?: string;
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
    mist_reports?: MISTReport[];
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
        );
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
        );
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
        );
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
        return this.dateTime !== undefined && this.dayName !== undefined && this.count !== undefined;
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
        );
    }
}

export interface Viewport extends ViewportBase {
    width: string;
    height: string;
}

/**
 * Helper Object for building clientInfo queries with team permissions (Jarvis Only)
 * Used with Session object to return correct client info
 * TeamIds array need only be specified for 'Open Teams' case
 */
export interface TeamPermissionsQuery {
    viewPermissions: "All" | "Open Teams" | "Closed Team";
    team_id: number | null;
    openTeamIds?: number[];
    closedTeamIds?: number[];
}

export interface Team {
    id: number;
    client_id: number;
    name: string;
    permissions: number;
    address?: string;
    ignored_report_types?: reportType[];
}

export interface TeamToInsert {
    client_id: number;
    name: string;
    address?: string;
    permissions?: number;
}

export interface TeamUpdate {
    id: number;
    name?: string;
    address?: string;
    permissions?: number;
}

export interface UserUpdate {
    id: number;
    team_id?: number | null;
    role?: number;
    designation?: string;
}

export interface AdminUserSelfUpdate {
    team_id?: number | null;
    designation?: string;
}

export interface Profile {
    nickname?: string;
    position?: string;
    address?: string;
    phone_cell?: string;
    phone_work?: string;
    phone_home?: string;
    emergency_contact_1?: EmergencyContactProfile;
    emergency_contact_2?: EmergencyContactProfile;
    medical?: MedicalProfile;
}

export interface EmergencyContactProfile {
    name?: string;
    relationship?: string;
    address?: string;
    phone_primary?: string;
    phone_secondary?: string;
}

export interface MedicalProfile {
    dob?: string;
    blood_type?: string;
    preferred_hospital?: string;
    medical_conditions?: string;
    doctor_1?: {
        name?: string;
        phone?: string;
        address?: string;
        office?: string;
    };
    doctor_2?: {
        name?: string;
        phone?: string;
        address?: string;
        office?: string;
    };
}

export interface UserFeatureSelection {
    sosButton?: boolean | null;
    addReportButton?: boolean | null;
    filtering?: boolean | null;
    filterTimeRangeDefault?: "7 Day" | "28 Day" | "24 Hour" | null;
    teamReportsMenu?: boolean | null;
    teamsMenu?: boolean | null;
    analyticsMenu?: boolean | null;
    analyticsAdvancedMenu?: boolean | null;
    forecastingMenu?: boolean | null;
    publicInsightsMenu?: boolean | null;
    newsfeedMenu?: boolean | null;
}

export interface AdminFeatureSelection {
    admin?: boolean | null;
    client?: boolean | null;
    areas?: boolean | null;
    logs?: boolean | null;
    aamp?: boolean | null;
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

export interface ReportTypeUpdate {
    client_id: number;
    team_id?: number;
    ignored_report_types: reportType[];
}

export interface ReportTemplate {
    id: number;
    name: string;
    client_id?: number;
    fields: TemplateSection[];
}

export interface TemplateSection {
    name: string;
    fields: TEMPLATE_FIELD[];
}

// export interface TemplateField {
//     label: "dropdown" | "short_string" | "long_string" | "number" | "tickbox";
//     template: TEMPLATE_FIELD;
// }

export interface ReportTemplateToInsert {
    name: string;
    client_id?: number;
    fields: TemplateSection[];
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

export interface NineLiner {
    serial_number: number | null;
    line_one: string | null; // location
    point?: Point;
    line_two: string | null; // radio frequency, call sign, and suffix
    line_three: {
        a: number | null;
        b: number | null;
        c: number | null;
        d: number | null;
        e: number | null;
    }; // number of patients by precendence
    line_four: string | null; // special equipment needed
    line_five: {
        litter: number | null;
        ambulatory: number | null;
    }; // number of patients
    line_six: string | null; // security at pick-up site
    line_seven: string | null; // method of marking pick-up site
    line_eight: string | null; // patient nationality and status
    line_nine: string | null; // NBC Contamination
}

export interface MISTReport {
    id: number;
    alert_report_id: number;
    client_id: number;
    date_time?: Date;
    user_id: number;
    fields: MISTReportFields;
}

export interface MISTReportToInsert {
    alert_report_id: number;
    date_time?: Date;
    user_id?: number;
    fields: MISTReportFields;
    team_id?: number;
}

export interface MISTReportUpdate {
    id: number;
    date_time?: Date;
    user_id?: number;
    fields: MISTReportFields;
}

export interface MISTReportFields {
    name?: string;
    date_of_birth?: string;
    blood_gp?: string;
    company?: string;
    urgency?: string;
    other?: string;
    injury_mechanism?: string[];
    injuries_found?: {
        front_head?: boolean;
        front_chest?: boolean;
        front_right_arm?: boolean;
        front_right_hand?: boolean;
        front_hips?: boolean;
        front_right_thigh?: boolean;
        front_right_leg?: boolean;
        back_head?: boolean;
        back_chest?: boolean;
        back_left_arm?: boolean;
        back_left_hand?: boolean;
        back_hips?: boolean;
        back_left_thigh?: boolean;
        back_left_leg?: boolean;
    };
    pulse_rate?: string;
    pulse_rate_location?: string;
    respiratory_rate?: string;
    pearl?: string;
    pearl_l?: string;
    pearl_r?: string;
    mental_status?: string;
    a?: boolean;
    v?: boolean;
    p?: boolean;
    u?: boolean;
    cat?: boolean;
    cat_time?: string;
    quik_clot?: boolean;
    quik_clot_time?: string;
    opa?: string; // small, medium, large
    npa?: string; //small, medium, large
    suction?: boolean;
    collar?: boolean;
    o2?: boolean;
    chest_seal_left?: boolean;
    chest_seal_right?: boolean;
    bvm?: boolean;
    needle_decomp_left?: boolean;
    needle_decomp_right?: boolean;
    iv_io?: boolean;
    site?: string;
    fluids?: string;
    amount?: number; // mls
    gauge?: string;
    bls?: string;
}

export interface Log {
    timestamp: Date;
    user_id?: number;
    client_id?: number;
    admin_user_id?: number;
    route: string;
}
