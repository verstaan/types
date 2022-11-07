import { request } from "./index";
import {
    ClientContainers,
    ClientUpdate,
    AdminUserProfile,
    NewAdminUser,
    NewClient,
    NewContainer,
    NewDefaultRegion,
    NewTeamAdmin,
    NewUser,
    Log,
    ChatFormLink,
    QueryResult
} from "../admin";
import { AdminNewAsset, Asset, AssetType, Risk } from "../case";
import { CountedForm, FormUpdate, editHistory, PendingAampReport, PendingAampReportUpdate, TelegramChat, TelegramMessageDetails } from "../aamp";
import { Container, ContainerResponseItem, DefaultRegion } from "../geo";
import { Client, ClientDisplayData, Team, TeamUpdate, UserProfile, UserUpdate } from "../client";
import { PublicReport } from "../reports";
import { Device } from "../auth";
import { DestinationOutputs, TravelTrip } from "../travelApp";

export const getClientDisplayData = (): Promise<ClientDisplayData> =>
    request<ClientDisplayData>(true, {
        method: "GET",
        url: "/admin/getClientDisplayData"
    });

export const modifyUser = (data: UserUpdate): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/modifyUser",
        data
    });

export const updateTeam = (data: TeamUpdate): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/updateTeam",
        data
    });

export const disableUser = (user_id: number, enable?: boolean): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/disableUser",
        data: {
            user_id,
            enable
        }
    });

export const updateClient = (data: ClientUpdate): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/updateClient",
        data
    });

export const createClientUser = (data: any): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/createClientUser",
        data
    });

export const createAdminUser = (data: NewAdminUser): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/createAdminUser",
        data
    });

export const createTeam = (data: NewTeamAdmin): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/createTeam",
        data
    });

export const createClient = (data: { client: NewClient; user: Partial<NewUser>; invite: boolean }): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/createClient",
        data
    });

export const getAllAdminUsers = (): Promise<AdminUserProfile[]> =>
    request<AdminUserProfile[]>(true, {
        method: "GET",
        url: "/admin/getAllAdminUsers"
    });

export const getAllContainers = (): Promise<Container[]> =>
    request<Container[]>(true, {
        method: "GET",
        url: "/admin/getAllContainers"
    });

export const getAllDefaultRegions = (): Promise<DefaultRegion[]> =>
    request<DefaultRegion[]>(true, {
        method: "get",
        url: "/admin/getAllDefaultRegions"
    });

export const updateContainer = (data: Partial<Container> & Pick<Container, "id">): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/updateContainer",
        data
    });

export const updateDefaultRegion = (data: Partial<DefaultRegion> & Pick<DefaultRegion, "id">): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/updateDefaultRegion",
        data
    });

export const getAllUsers = (): Promise<UserProfile[]> =>
    request<UserProfile[]>(true, {
        method: "GET",
        url: "/admin/getAllUsers"
    });

export const createContainer = (data: NewContainer): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/createContainer",
        data
    });

export const createDefaultRegion = (data: NewDefaultRegion): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/createDefaultRegion",
        data
    });

export const queryLogs = (query: any): Promise<QueryResult<Log>> =>
    request<QueryResult<Log>>(true, {
        method: "POST",
        url: "/admin/queryLogs",
        data: query
    });

export const getAdminProfile = (): Promise<AdminUserProfile> =>
    request<AdminUserProfile>(true, {
        method: "GET",
        url: "/admin/getAdminProfile"
    });

export const getClientUsers = (): Promise<UserProfile[]> =>
    request<UserProfile[]>(true, {
        method: "get",
        url: "/client/getClientUsers"
    });

export const modifyClientContainers = (data: ClientContainers): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/modifyClientContainers",
        data
    });

export const getClientContainers = (client_id: number): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/admin/getClientContainers",
        data: { client_id }
    });

export const getContainers = (): Promise<ContainerResponseItem> =>
    request<ContainerResponseItem>(true, {
        method: "GET",
        url: "/admin/getContainers"
    });

export const createForm = (data: any): Promise<number> =>
    request<number>(true, {
        method: "POST",
        url: "/aamp/createForm",
        data
    });

export const modifyForm = (data: FormUpdate): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/aamp/modifyForm",
        data
    });

export const registerChat = (data: ChatFormLink): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/aamp/bot/registerChat",
        data
    });

export const getChats = (): Promise<TelegramChat[]> =>
    request<TelegramChat[]>(true, {
        method: "GET",
        url: "/aamp/getChats"
    });

export const getCountedForms = (): Promise<{ [container_name: string]: CountedForm[] }> =>
    request<{ [container_name: string]: CountedForm[] }>(true, {
        method: "GET",
        url: "/aamp/getFormsAndCounts"
    });

export const getAampReportsByFormId = (form: number): Promise<PendingAampReport[]> =>
    request<PendingAampReport[]>(true, {
        method: "POST",
        url: "/aamp/getPendingReportsByFormId",
        data: {
            requestedForm: form
        }
    });
export const getReportChatMessages = (report_id: number, before: number, after: number): Promise<TelegramMessageDetails[]> =>
    request<TelegramMessageDetails[]>(true, {
        method: "POST",
        url: "/aamp/getReportChatMessages",
        data: { report_id, before, after }
    });

export const getFullTranscriptMessages = (report_id: number): Promise<TelegramMessageDetails[]> =>
    request<TelegramMessageDetails[]>(true, {
        method: "POST",
        url: "/aamp/getFullTranscriptMessages",
        data: { report_id }
    });

export const adminGetReports = (): Promise<PublicReport[]> =>
    request<PublicReport[]>(true, {
        method: "GET",
        url: "/admin/getReports"
    });

export const adminGetReportsInContainer = (
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
        url: "/admin/getReportsInContainer",
        data: {
            container_id
        }
    });

export const getAssets = (): Promise<Asset[]> =>
    request<Asset[]>(true, {
        method: "GET",
        url: "/admin/getAssets"
    });

export const getAllScenarios = (): Promise<Asset[]> =>
    request<Asset[]>(true, {
        method: "GET",
        url: "/admin/getAllScenarios"
    });

export const getAssetScenarios = (id: number): Promise<Asset[]> =>
    request<Asset[]>(true, {
        method: "POST",
        url: "/admin/getAssetScenarios",
        data: {
            asset_id: id
        }
    });

export const getAllRisks = (): Promise<Risk[]> =>
    request<Risk[]>(true, {
        method: "GET",
        url: "/admin/getAllAssetRisks"
    });

export const getAssetRisks = (id: number): Promise<Risk[]> =>
    request<Risk[]>(true, {
        method: "POST",
        url: "/admin/getAssetRisks",
        data: { asset_id: id }
    });

export const updateAssetRisk = (id: number, assetRisk: Risk, changes: string[]): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/updateAssetRisk",
        data: { risk_id: id, risk: { ...assetRisk, id: undefined }, changes }
    });

export const addAssetRisk = (risk: Risk): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/addAssetRisk",
        data: { ...risk }
    });

export const getAssetTypes = (): Promise<AssetType[]> =>
    request<AssetType[]>(true, {
        method: "GET",
        url: "/admin/getAssetTypes"
    });

export const getDevices = (): Promise<Device[]> =>
    request<Device[]>(true, {
        method: "GET",
        url: "/admin/getDevices"
    });

export const getAllClients = (): Promise<Client[]> =>
    request<Client[]>(true, {
        method: "GET",
        url: "/admin/getAllClients"
    });

export const getAllTeams = (): Promise<Team[]> =>
    request<Team[]>(true, {
        method: "GET",
        url: "/admin/getAllTeams"
    });

export const addAsset = (data: AdminNewAsset): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/addAsset",
        data
    });

export const addAssetType = (data: AssetType): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/addAssetType",
        data
    });

export const updateAsset = (asset_id: number, asset: Asset): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/updateAsset",
        data: { asset_id, asset }
    });

export const updateAssetType = (oldName: string, assetType: AssetType): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/admin/updateAssetType",
        data: {
            oldName,
            asset_type: assetType
        }
    });

export const getFullTranscriptMessagesByChatID = (chat_id: number): Promise<TelegramMessageDetails[]> =>
    request<TelegramMessageDetails[]>(true, {
        method: "POST",
        url: "/aamp/getFullTranscriptMessagesByChatID",
        data: { chat_id }
    });

export const updatePendingReport = (data: PendingAampReportUpdate): Promise<void> =>
    request<void>(true, {
        method: "POST",
        url: "/aamp/updatePendingReport",
        data
    });

export const getPendingReportEdits = (report_id: number): Promise<editHistory[]> =>
    request<editHistory[]>(true, {
        method: "POST",
        url: "/aamp/getPendingReportEdits",
        data: { report_id }
    });

export const getRiskEdits = (risk_id: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/getRiskEdits",
        data: {
            risk_id
        }
    });

export const getUserProfileByID = (user_id: number): Promise<UserProfile> =>
    request<UserProfile>(true, {
        method: "POST",
        url: "/admin/getUserProfile",
        data: { user_id }
    });

export const getSummaryData = (date: string, dataset: string): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/getSummaryData",
        data: { date, dataset }
    });
export const getPublicReports = (date: string | undefined, week: string | undefined, month: string, container: number, region: number | undefined, category: string, category_value: string): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/getPublicReports",
        data: { date, week, month, container, region, category, category_value }
    });
export const getAllPublicReports = (date: string): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/getAllPublicReports",
        data: { date }
    });
export const searchNewsDB = (searchterm: string): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/searchNewsDB",
        data: { searchterm }
    });

export const getMonitoringData = (client_id: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/getMonitoringData",
        data: { client_id }
    });


export const testUserNotifs = (user_id: number, report_id: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/testUserNotifs",
        data: { user_id, report_id }
    });

export const handleScheduledMessages = (mode: string, scheduled_for: Date | null, container_ids: number[] | null, region_ids: number[] | null, title: string | null, text: string | null, sent_by: number | null, id_to_delete: number | null, is_test: Boolean | null, custom_user_ids: number[]): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/handleScheduledMessages",
        data: { mode, scheduled_for, container_ids, region_ids, title, text, sent_by, id_to_delete, is_test, custom_user_ids }
    });

export const getPendingTrips = (): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/getPendingTrips",
    });

export const getTravelUserById = (user_id: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/getTravelUserById",
        data: { user_id }
    });

export const getTripById = (trip_id: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/getTripById",
        data: { trip_id }
    });

export const getTripDestinations = (trip_id: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/getTripDestinations",
        data: { trip_id }
    });

export const compileDestinationOutputs = (user_id: number, trip_id: number, radius: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/compileDestinationOutputs",
        data: { user_id, trip_id, radius }
    });

export const approveTrip = (user_id: number, trip_id: number, tripOutputs: DestinationOutputs[]): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/approveTrip",
        data: { user_id, trip_id, tripOutputs }
    });

export const insertUniversalGeometry = (newGeom: any): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/insertUniversalGeometry",
        data: { newGeom }
    });

export const fetchUniversalGeometry = (): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/fetchUniversalGeometry",
        //data: { newGeom }
    });

export const deleteUniversalGeometryById = (geom_id: number): Promise<any> =>
    request<any>(true, {
        method: "POST",
        url: "/admin/travelApp/deleteUniversalGeometryById",
        data: { geom_id }
    });