import { request } from "./index";
import { Analytics, AnalyticsSummary } from "../analytics";

export const containerSummary = (container_id: number): Promise<Analytics> =>
    request<Analytics>(true, {
        method: "post",
        url: "/analytics/containerSummary",
        data: {
            container_id
        }
    });

export const regionSummary = (region_id: number): Promise<Analytics> =>
    request<Analytics>(true, {
        method: "post",
        url: "/analytics/regionSummary",
        data: {
            region_id
        }
    });

export const summary = (type: "container" | "default_region", id: number): Promise<AnalyticsSummary> =>
    request<AnalyticsSummary>(true, {
        method: "post",
        url: "/analytics/summaryJarvis",
        data: {
            region: type,
            id
        }
    });

export const crimeGrid = (defaultRegionId: number): Promise<any> =>
    request<any>(true, {
        method: "post",
        url: "/analytics/geoForecast",
        data: {
            defaultRegionId
        }
    });

export const adminCrimeGrid = (defaultRegionId: number): Promise<any> =>
    request<any>(true, {
        method: "post",
        url: "/admin/geoForecast",
        data: {
            defaultRegionId
        }
    });
