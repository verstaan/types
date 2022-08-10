import { request } from "./index";
import { Asset, AssetRiskQuery, AssetType, ClientNewAsset, Group } from "../case";

export const createAsset = (asset: ClientNewAsset): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/client/case/createAsset",
        data: asset
    });

export const getAssetTypes = (): Promise<AssetType[]> =>
    request<AssetType[]>(true, {
        method: "get",
        url: "client/case/getAssetTypes"
    });

export const getClientAssetsRisks = (): Promise<AssetRiskQuery[]> =>
    request<AssetRiskQuery[]>(true, {
        method: "get",
        url: "/client/case/getAssetsRisks"
    });

export const fetchAssetsByClientOrGroup = (by: string, query_id: number): Promise<Asset[]> =>
    request<Asset[]>(true, {
        method: "post",
        url: "/case-core/fetchAssetsByClientOrGroup",
        data: {by, query_id}
    });

export const fetchGroupsByClient = (client_id: number): Promise<Group[]> =>
    request<Group[]>(true, {
        method: "post",
        url: "/case-core/fetchGroupsByClient",
        data: { client_id }
    });

export const fetchGroupById = (group_id: number): Promise<Group> =>
    request<Group>(true, {
        method: "post",
        url: "/case-core/fetchGroupById",
        data: { group_id }
    });