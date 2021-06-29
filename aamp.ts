import { Point } from "geojson";
import { AdminPrivileges } from "./admin";
import { reportType } from "./reports";

export type Review = boolean | null; // true is approved, false is rejected, null is not yet reviewed

export type AutoVerificationFailure = "photo-metadata-location" | "photo-metadata-missing";

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
    first_name: string;
    last_name: string;
    email?: string;
    date_time: Date;
    address?: string;
    description: string;
    media: string[];
    point: Point;
    fields: AampReportFields;
}

/**
 * Form received from API
 */
 export interface Form extends NewForm {
    id: number;
    domains: string[];
    immediate_public: boolean;
}

export interface CountedForm extends NewForm {
    id: number;
    domains: string[];
    immediate_public: boolean;
    count: number;
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
    archived: AdminPrivileges.MANAGER
};