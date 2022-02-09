import { request } from "./index";
import { AssetRiskQuery, AssetType, ClientNewAsset } from "../case";

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
