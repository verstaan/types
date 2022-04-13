import { Geometry, LineString, Point, Polygon } from "geojson";
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
    name: string | undefined;
    accepts_future_reports: boolean;
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
    end_date?: Date | null;
    address?: string;
    description: string;
    chat_messages?: number[];
    source_message?: number;
    bot_generated?: boolean;
    media?: string[];
    point?: Point | LineString | Polygon;
    fields: AampReportFields;
    impact_level: "Low" | "High" | "Priveliged Source";
    analyst_notes?: string | null;
    is_future: boolean;
}

/**
 * Form received from API
 */
export interface Form extends NewForm {
    id: number;
    domains: string[];
    immediate_public: boolean;
}

export interface FormUpdate extends NewForm {
    id: number;
}

export interface CountedForm extends NewForm {
    id: number;
    domains: string[];
    immediate_public: boolean;
    count: number;
    chats: string[];
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
    changes: string[];
}

export type PendingAampReportUpdate = Partial<Omit<PendingAampReport, "fields" | "changes">> & {
    id: number;
    fields?: Partial<AampReportFields>;
    changes: string[];
};

export interface editHistory {
    payload: {
        aamp_report_type?: string;
        description?: string;
        aggressor?: string;
        victim?: string;
        address?: string;
        date_time?: string;
        super_user_review?: boolean;
        manager_review?: boolean;
        archived?: boolean;
        point?: JSON;
    };
    timestamp: string;
    admin_user_id?: number | null;
    user_id?: number | null;
}

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
 *
 * Interfaces corresponding to Message and Chat objects from Telegram's Bot API
 *
 */

/**
 * Telegram message as represented in the DB
 */
export interface TelegramMessage {
    message_id: number;
    text: string;
    chat_id: number;
    user_id: number;
    date: number;
    media?: string | undefined;
    type: string;
    photo?: TelegramPhotoSize[];
    video?: TelegramVideo;
    animation?: any;
    audio?: any;
    document?: any;
    sticker?: any;
    contact?: any;
    game?: any;
    poll?: any;
    venue?: any;
    location?: any;
    invoice?: any;
    caption?: any;
}

export interface TelegramPhotoSize {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    file_size?: number;
}

export interface TelegramVideo {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    duration: number;
    thumb?: TelegramPhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}

/**
 * Telegram message with user and chat objects embedded.
 * This is the format that Telegram sends its messages in
 */
export interface TelegramMessageDetails extends Omit<TelegramMessage, "chat_id" | "user_id"> {
    from: TelegramUser;
    chat: TelegramChat;
}

export interface TelegramChat {
    id: number;
    type: string;
    title: string;
    form_id?: number;
}

export interface TelegramUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
}
