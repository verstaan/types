import { Point } from "geojson";

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
export type HazardCategory = "Dangerous Terrain" | "Roadblock" | "Fire" | "Police" | "Checkpoint" | "Explosion (Accidental)" | "Auto Accident";
export type OtherCategory = "Other" | "Suspicious Activity" | "Suspicious Vehicle" | "Suspicious Object";
export type EventType = ViolentCategory | NonViolentCategory | HazardCategory | OtherCategory;

export interface Categories {
    Violent: Array<ViolentCategory>;
    "Non-Violent": Array<NonViolentCategory>;
    Hazard: Array<HazardCategory>;
    Other: Array<OtherCategory>;
}

export const ReportCategories: Record<CategoryTypes, Array<ViolentCategory | NonViolentCategory | HazardCategory | OtherCategory>> = {
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
    Hazard: ["Dangerous Terrain", "Roadblock", "Fire", "Police", "Checkpoint", "Explosion (Accidental)", "Auto Accident"],
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

export interface ReportBase {
    // Part A: Transportation Details (based on setting)
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
    // Part B: Incident Details
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
    // Part C: Details of Raiding Party
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
    // Part D: Details Weapons and Damage
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
    // Part E: Other Details
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
    // Part F: Client Imported Report I
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
    // Part A: Transportation Details (based on setting)
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
    // Part B: Incident Details
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
    // Part C: Details of Raiding Party
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
    // Part D: Details Weapons and Damage
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
    // Part E: Other Details
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
    // Part F: Client Imported Report I
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
    // MUST PASS IN SETTING, A QUICK REPORT ID, AND TIME OF MODIFICATION
    setting?: Setting;
    quick_report_id: number | null;
    alert_report_id: number | null;
    client_id: number;
    team_id?: number;
    // Part A: Transportation Details (based on setting)
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
    // Part B: Incident Details
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
    // Part C: Details of Raiding Party
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
    // Part D: Details Weapons and Damage
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
    // Part E: Other Details
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
    // Part F: Client Imported Report I
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
    // MUST PASS IN SETTING, REPORT ID, AND TIME OF MODIFICATION
    setting?: Setting;
    full_report_id: number;
    photo_url?: string;
    // Part A: Transportation Details (based on setting)
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
    // Part B: Incident Details
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
    // Part C: Details of Raiding Party
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
    // Part D: Details Weapons and Damage
    weapons_sighted?: number;
    weapons_used?: number;
    weapons_type?: WeaponType;
    weapons_description?: string;
    damage_caused?: number;
    damage_details?: string;
    ladders_sighted?: number;
    other_equipment?: string;
    // Part E: Other Details
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
    // Part F: Client Imported Report I
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

export type ReportNotificationType = "Public" | "Quick" | "Alert" | "Alert-Update" | "Alert-Cancel" | "Alert-Confirm" | "Bulletin";

export interface ReportNotificationData {
    type: ReportNotificationType;
    id: string;
}

export interface BulletinNotificationData {
    type: ReportNotificationType;
    title: string;
    text: string;
}


export interface CombinedClientReportItem {
    id: number;
    type: "Quick" | "Alert";
    report: ClientReport | ClientAlertReport;
    full_report?: FullClientReport;
    mist_reports?: MISTReport[];
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

export interface ReportTemplateToInsert {
    name: string;
    client_id?: number;
    fields: TemplateSection[];
}

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
    npa?: string; // small, medium, large
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

export interface MISTReportToInsert {
    alert_report_id: number;
    date_time?: Date;
    user_id?: number;
    fields: MISTReportFields;
    team_id?: number;
}

/**
 *
 * Types defining structures to be immediately inserted to the database.
 *
 * These can be used as generics with Knex.js for better type safety.
 *
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

/**
 * Templated client report fields:
 */

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
