import { request } from "./index";
import { QueryResult } from "material-table";
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
    ChatFormLink
} from "../admin";
import { Container, DefaultRegion } from "../geo";
import { ClientDisplayData, TeamUpdate, UserProfile, UserUpdate } from "../client";
import { CountedForm, FormUpdate, editHistory, PendingAampReport, PendingAampReportUpdate, TelegramChat, TelegramMessageDetails } from "../aamp";

export const getClientDisplayData = (): Promise<ClientDisplayData> => request<ClientDisplayData>(true, {
    method: "GET",
    url: "/admin/getClientDisplayData",
});

export const modifyUser = (data: UserUpdate): Promise<void> => request<void>(true, {
    method: "POST",
    url: "/admin/modifyUser",
    data: data
});

export const deleteUser = (data: UserUpdate): Promise<void> => request<void>(true, {
    method: "POST",
    url: "/admin/deleteUser",
    data: data
});

export const updateTeam = (data: TeamUpdate): Promise<void> => request<void>(true, {
    method: "POST",
    url: "/admin/updateTeam",
    data: data
});

export const updateClient = (data: ClientUpdate): Promise<void> => request<void>(true, {
    method: "POST",
    url: "/admin/updateClient",
    data: data
});

export const createClientUser = (data: any): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/createClientUser",
    data: data
});

export const createAdminUser = (data: NewAdminUser): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/createAdminUser",
    data: data
});

export const createTeam = (data: NewTeamAdmin): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/createTeam",
    data: data
});

export const createClient = (data: { client: NewClient, user: Partial<NewUser>, invite: boolean }): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/createClient",
    data: data
});

export const getAllUsers = (): Promise<UserProfile[]> => request<UserProfile[]>(true, {
    method: "GET",
    url: "/admin/getAllUsers",
})

export const getAllAdminUsers = (): Promise<AdminUserProfile[]> => request<AdminUserProfile[]>(true, {
    method: "GET",
    url: "/admin/getAllAdminUsers",
});

export const getAllContainers = (): Promise<Container[]> => request<Container[]>(true, {
    method: "GET",
    url: "/admin/getAllContainers",
});

export const getAllDefaultRegions = (): Promise<DefaultRegion[]> => request<DefaultRegion[]>(true, {
    method: "get",
    url: "/admin/getAllDefaultRegions",
});

export const updateContainer = (data: Partial<Container> & Pick<Container, "id">): Promise<void> => request<void>(true, {
    method: "POST",
    url: "/admin/updateContainer",
    data: data
});

export const updateDefaultRegion = (data: Partial<DefaultRegion> & Pick<DefaultRegion, "id">): Promise<void> => request<void>(true, {
    method: "POST",
    url: "/admin/updateDefaultRegion",
    data: data
});

export const createContainer = (data: NewContainer): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/createContainer",
    data: data
});

export const createDefaultRegion = (data: NewDefaultRegion): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/createDefaultRegion",
    data: data
});

export const queryLogs = (query: any): Promise<QueryResult<Log>> => request<QueryResult<Log>>(true, {
    method: "POST",
    url: "/admin/queryLogs",
    data: query
});

export const getAdminProfile = (): Promise<AdminUserProfile> => request<AdminUserProfile>(true, {
    method: "GET",
    url: "/admin/getAdminProfile"
})

export const getClientUsers = (): Promise<UserProfile[]> =>
    request<UserProfile[]>(true, {
        method: "get",
        url: "/client/getClientUsers"
});

export const modifyClientContainers = (data: ClientContainers): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/modifyClientContainers",
    data: data
});

export const getClientContainers = (client_id: number): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/admin/getClientContainers",
    data: { client_id }
});

export const createForm = (data: any): Promise<number> => request<number>(true, {
    method: "POST",
    url: "/aamp/createForm",
    data: data
});

export const modifyForm = (data : FormUpdate): Promise<void> => request<void>(true, {
    method: "POST",
    url:  "/aamp/modifyForm",
    data: data
});

export const registerChat = (data: ChatFormLink): Promise<void> => request<void>(true, {
    method: "POST",
    url: "/aamp/bot/registerChat",
    data: data
})

export const getChats = () : Promise<TelegramChat[]> => request<TelegramChat[]>(true, {
    method: "GET",
    url: "/aamp/getChats",
});

export const getCountedForms = () : Promise<{[container_name: string]: CountedForm[]}> => request<{ [container_name: string]: CountedForm[] }>(true, {
    method: "GET",
    url: "/aamp/getFormsAndCounts",
});

export const getAampReportsByFormId = (form: number) : Promise<PendingAampReport[]> => request<PendingAampReport[]>(true, {
    method: "POST",
    url: "/aamp/getPendingReportsByFormId",
    data: { requestedForm: form }
});

export const getReportChatMessages = (report_id: number, before: number, after: number): Promise<TelegramMessageDetails[]> =>
request<TelegramMessageDetails[]>(true, {
  method: "POST",
  url: "/aamp/getReportChatMessages",
  data: { report_id, before, after },
});

export const getFullTranscriptMessages = (report_id: number): Promise<TelegramMessageDetails[]> => request<TelegramMessageDetails[]>(true, {
  method: "POST",
  url: "/aamp/getFullTranscriptMessages",
  data: { report_id },
});

export const getFullTranscriptMessagesByChatID = (chat_id: number): Promise<TelegramMessageDetails[]> => request<TelegramMessageDetails[]>(true, {
    method: "POST",
    url: "/aamp/getFullTranscriptMessagesByChatID",
    data: { chat_id },
});

export const updatePendingReport = (data: PendingAampReportUpdate) : Promise<void> => request<void>(true, {
    method: "POST",
    url: "/aamp/updatePendingReport",
    data: data
});

export const getPendingReportEdits = (report_id: number) : Promise<editHistory[]> => request<editHistory[]>(true, {
    method: "POST",
    url: "/aamp/getPendingReportEdits",
    data: { report_id }
})

export const getUserProfileByID = (user_id: number) : Promise<UserProfile> => request<UserProfile>(true, {
    method: "POST",
    url: "/admin/getUserProfile",
    data: { user_id }
})
