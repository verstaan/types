import { Point } from "geojson";
import { ClientReportActions, ClientReportNeeds, reportType, PublicReportSourceType } from "./index";

export class PublicReport {
  created_at: Date | undefined;
  date_time: Date | undefined;
  point: Point | undefined;
  address: string | undefined;
  report_type: reportType | undefined;
  source_type: PublicReportSourceType | undefined;
  description: string | undefined;
  verified: number | undefined;
  client_id: number | undefined;
  container_id: number | undefined;
  default_regions_id: number | undefined;
  photo_url: string | undefined;
  actor: string | undefined;
  target: string | undefined;

  constructor(init: Partial<PublicReport>) {
    Object.assign(this, init);
  }

}
