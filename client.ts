import { Point } from "geojson";
import { reportType } from "./reports";

/**
 *
 * Defines types relevant to client users accessing Orion.
 *
 */

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
    created_at?: Date;
    disabled?: boolean;
    verif_code?: string;
    verif_exp?: Date;
}

export type UserDesignation = "Medic" | "";
export const ValidUserDesignations: UserDesignation[] = ["Medic", ""];

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
    incidents: number;
    alerts: number;
    full_reports: number;
    users: number;
    activity: number;
}

export type DisplayTeam = Omit<Team, "id"> & {
    id: number | null;
    type: "Team";
};

export interface DisplayUserProfile extends UserProfile {
    type: "UserProfile";
    incidents: number;
    alerts: number;
    full_reports: number;
    users: number;
    activity: number;
    last_active?: Date;
}

export interface ClientDisplayData {
    clientData: DisplayClient[];
    teamData: DisplayTeam[];
    userData: DisplayUserProfile[];
    teamContext: Record<number, Record<number | "null", string>>;
    containerContext: string[];
}

export type ClientProfile = Client;

export interface Team {
    id: number;
    client_id: number;
    name: string;
    permissions: number;
    address?: string;
    ignored_report_types?: reportType[];
}

export interface NewTeam {
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
    disabled?: boolean;
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
    tracking?: boolean | null;
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

export interface SubscriptionData {
    user_id: number | undefined;
    client_id: number | undefined;
    token: string | undefined;
    device_type: string | undefined;
    device_fingerprint: string | undefined;
    point: Point | undefined;
    modified_at: Date | undefined;
}

export interface ScheduledMesssage {
    id: number;
    created_at: Date;
    scheduled_for: Date;
    container_id: number;
    text: string;
    has_been_sent: Boolean;
    sent_by: number; // admin user id of person who sent the message
}