import { request } from "./index";
import { Point } from "geojson";
import {
    NewClientReport,
    ClientReport,
    NewClientAlertReport,
    ClientAlertReport,
    AlertReportUpdate,
    PublicReport,
    FullClientReportUpdate,
    FullClientReport,
    FullClientReportToInsert,
    CombinedClientReportItem,
    reportType,
    ReportTemplate,
    MISTReport,
    MISTReportToInsert,
    MISTReportUpdate
} from "../reports";
import {
    AdminUserSelfUpdate,
    ClientProfile,
    PendingUserInvite,
    Profile,
    Team,
    NewTeam,
    TeamUpdate,
    UserProfile,
    UserUpdate,
    PublicInsight
} from "../client";
import { ContainerResponseItem, GeoAttribution } from "../geo";
import { Device, DeviceSubscription } from "../auth";

export const user = {
    getProfile: (): Promise<UserProfile> =>
        request<UserProfile>(true, {
            method: "get",
            url: "/client/user/getProfile"
        })
};

export const getClient = (): Promise<ClientProfile> =>
    request<ClientProfile>(true, {
        method: "get",
        url: "/client/getClient"
    });

export const getReports = (): Promise<ClientReport[]> =>
    request<ClientReport[]>(true, {
        method: "get",
        url: "/client/getReports"
    });

export const getAlertReports = (): Promise<ClientAlertReport[]> =>
    request<ClientAlertReport[]>(true, {
        method: "get",
        url: "/client/getAlertReports"
    });

export const getClientUsers = (): Promise<UserProfile[]> =>
    request<UserProfile[]>(true, {
        method: "get",
        url: "/client/getClientUsers"
    });

export const getClientDevices = (): Promise<Device[]> =>
    request<Device[]>(true, {
        method: "get",
        url: "/client/getClientDevices"
    })

export const createReport = (report: NewClientReport): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/createReport",
        data: report
    });

export const alertConfirm = (alert_id: number): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/alertConfirm",
        data: {
            alert_id
        }
    });

export const alertDelete = (alert_id: number): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/alertDelete",
        data: {
            alert_id
        }
    });

export const getContainers = (): Promise<ContainerResponseItem> =>
    request<ContainerResponseItem>(true, {
        method: "get",
        url: "/client/getContainers"
    });

export const getDevices = (): Promise<Device[]> =>
    request<Device[]>(true, {
        method: "get",
        url: "/client/user/getDevices"
    });

export const subscribeDevice = (sub: DeviceSubscription): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/user/subscribe",
        data: {
            ...sub
        }
    });

export const updateSubscription = (token: string, device_fingerprint: string, point?: Point): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/user/updateSubscriptionToken",
        data: {
            token,
            device_fingerprint,
            point
        }
    });

export const removeSubscription = (device_fingerprint: string): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/user/removeSubscriptionToken",
        data: {
            device_fingerprint
        }
    });



export const updateContainerAndFetchReports = (
    container_id?: number
): Promise<{
    container_id: number;
    public_reports: PublicReport[];
}> =>
    request<{
        container_id: number;
        public_reports: PublicReport[];
    }>(true, {
        method: "post",
        url: "/client/updateContainerAndFetchReports",
        data: {
            container_id
        }
    });

export const createAlertReport = (report: NewClientAlertReport): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/createAlertReport",
        data: report
    });

export const alertCancel = (): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/alertCancel"
    });

export const alertUpdate = (update: AlertReportUpdate): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/alertUpdate",
        data: update
    });

export const createFullReport = (report: FullClientReportToInsert): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/createFullReport",
        data: report
    });

export const updateFullReport = (reportUpdate: FullClientReportUpdate): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/updateFullReport",
        data: reportUpdate
    });

export const getFullReports = (): Promise<FullClientReport[]> =>
    request<FullClientReport[]>(true, {
        method: "get",
        url: "/client/getFullReports"
    });

export const getMatchingFullReport = (full_report_id: number): Promise<FullClientReport> =>
    request<FullClientReport>(true, {
        method: "post",
        url: "/client/getMatchingFullReport",
        data: full_report_id
    });

export const getCombinedReports = (): Promise<CombinedClientReportItem[]> =>
    request<CombinedClientReportItem[]>(true, {
        method: "get",
        url: "/client/getCombinedReports"
    });

export const updateLocation = (device_fingerprint: string, point: Point): Promise<GeoAttribution | null> =>
    request<GeoAttribution | null>(true, {
        method: "post",
        url: "/client/user/updateLocation",
        data: {
            device_fingerprint,
            point
        }
    });

export const getSuggestedReportTypes = (): Promise<reportType[]> =>
    request<reportType[]>(true, {
        method: "get",
        url: "/client/user/getSuggestedReportTypes"
    });

export const getPublicInsights = (): Promise<PublicInsight[]> =>
    request<PublicInsight[]>(true, {
        method: "get",
        url: "/client/getPublicInsights"
    });

export const getTeams = (): Promise<Team[]> =>
    request<Team[]>(true, {
        method: "get",
        url: "client/getTeams"
    })

export const createTeam = (team: NewTeam): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "client/createTeam",
        data: team
    })

export const updateTeam = (teamUpdate: TeamUpdate): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "client/updateTeam",
        data: teamUpdate
    })

export const modifyUser = (userUpdate: UserUpdate): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "client/modifyUser",
        data: userUpdate
    })

export const getReportTemplates = (): Promise<ReportTemplate[]> =>
    request<ReportTemplate[]>(true, {
        method: "get",
        url: "/client/getReportTemplates"
    });

export const getMISTReports = (): Promise<MISTReport[]> =>
    request<MISTReport[]>(true, {
        method: "get",
        url: "client/getMISTReports"
    });
export const createMISTReport = (report: MISTReportToInsert): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/createMISTReport",
        data: report
    });
export const updateMISTReport = (update: MISTReportUpdate): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/updateMISTReport",
        data: update
    });

export const updateProfile = (update: Profile): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/user/updateProfile",
        data: update
    });

export const updateSelfAdmin = (update: AdminUserSelfUpdate): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/user/updateSelfAdmin",
        data: update
    });

export const inviteUser = (invite: PendingUserInvite): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/inviteUser",
        data: {
          ...invite
        }
    });
