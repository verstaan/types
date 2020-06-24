import { GeoJsonObject, Point } from "geojson";

export type ClientReportType = "Shooting" | "Theft" | "Protest" | "Emergency Response";

export type ClientReportActions = "Assisting" | "Observing" | "Coordinating" | "Following" | "No Actions";

export type ClientReportNeeds = "Exfil" | "MedEvac" | "CasEvac" | "Police" | "Fire";

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
export type ViolentCategory = "Assault" | "Shooting" | "Violent Crime" | "Gang Activity";
export type NonViolentCategory = "Protest" | "Emergency Response" | "Theft";
export type HazardCategory = "Dangerous Terrain" | "Roadblock/checkpoint";
export type OtherCategory = "Other";

export interface Categories {
    Violent: Array<ViolentCategory>;
    "Non-Violent": Array<NonViolentCategory>;
    Hazard: Array<HazardCategory>;
    Other: Array<OtherCategory>;
}

export const ReportCategories: Record<CategoryTypes, Array<ViolentCategory | NonViolentCategory | HazardCategory | OtherCategory>>  = {
  "Violent": ["Assault", "Shooting", "Violent Crime", "Gang Activity"],
  "Non-Violent": ["Protest", "Emergency Response", "Theft"],
  "Hazard": ["Dangerous Terrain", "Roadblock/checkpoint"],
  "Other": ["Other"]
};

export type PublicReportSourceType = "Client" | "VAMP" | "Open Source";

export interface UserProfile {
    id: number;
    email: string;
    // password: string;
    first_name: string;
    last_name: string;
    role: number;
    client_id: number;
    current_container?: number;
}

export interface ClientProfile {
    id: number;
    name: string;
    primary_email: string;
    licenses: number;
    created_at: Date;
}

export interface NewClient {
    name: string;
    primary_email: string;
    licenses: number;
    containers: string[];
}

export interface Container {
    id: number;
    area: GeoJsonObject;
    name: string;
}

export interface DefaultRegion {
    id: number;
    name: string;
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
    report_type: PublicReportType;
    description: string;
    photoUrl?: string;
    verified?: number;
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

export interface NewClientReport {
    date_time: Date;
    point: Point;
    address?: string;
    report_type: ClientReportType;
    report_actions?: ClientReportActions;
    report_needs?: ClientReportNeeds;
}

export interface NewClientAlertReport {
    date_time: Date;
    point: Point;
    address?: string;
}

/**
 * Alert update for a QUICK Alert Report. Full Alert Report update is below.
 */
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
    actor?: string;
    target?: string;
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
}

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
    photoUrl?: string;
    actor?: string;
    target?: string;
}

/**
 * Client Report to be added to DB
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
    photoUrl?: string;
}

/**
 * Client Alert Report to be added to DB
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
    photoUrl?: string;
}

export interface Login {
    iat: number;
    exp: number;
    token: string;
}


/**
 * Creating a Full Client Report
 */
export interface FullClientReport {
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
    photoUrl?: string;
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
