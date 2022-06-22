import { request } from "./index";
import { Container, DefaultRegion } from "../geo";
import { NewVampReport } from "../aamp";
import { NewOsReport, PublicReport } from "../reports";

// createVampReport does not yet return properly wrapped responses on the Jarvis side so using this method will trigger an error until Jarvis is updated:
export const createVampReport = (report: NewVampReport): Promise<void> =>
    request<void>(false, {
        method: "post",
        url: "/public/createVampReport",
        data: report
    });

// There is a note in the Jarvis source code "TODO: Handle auth check" so I'm making this handler pass the token right now under the assumption that it will eventually be required:
export const createOsReport = (report: NewOsReport): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/public/createOsReport",
        data: report
    });

// getContainers does not yet return properly wrapped responses on the Jarvis side so using this method will trigger an error until Jarvis is updated:
export const getContainers = (): Promise<Container[]> =>
    request<Container[]>(false, {
        method: "get",
        url: "/public/getContainers"
    });

// getDefaultRegions does not yet return properly wrapped responses on the Jarvis side so using this method will trigger an error until Jarvis is updated:
export const getDefaultRegions = (): Promise<DefaultRegion[]> =>
    request<DefaultRegion[]>(false, {
        method: "get",
        url: "/public/getDefaultRegions"
    });

export const getReports = (): Promise<PublicReport[]> =>
    request<PublicReport[]>(false, {
        method: "get",
        url: "/public/getReports"
    });


export const getReportsBounded = (container_id: number, pastXdays: number): Promise<PublicReport[]> =>
    request<PublicReport[]>(false, {
        method: "post",
        url: "/public/getReportsBounded",
        data: { container_id, pastXdays }
    });
