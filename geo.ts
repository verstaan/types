import { Polygon, MultiPolygon } from "geojson";

export interface ViewportBase {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface ContainerToInsert {
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    abbreviation?: string;
}

export interface Container {
    id: number;
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    abbreviation?: string;
}

export interface DefaultRegionToInsert {
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    container_id: number;
}

export interface DefaultRegion {
    id: number;
    area?: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    container_id: number;
}

export interface GeoAttribution {
    container_id?: number;
    default_region_id?: number;
}

export interface ContainerResponseItem {
    containers: Container[];
    default_regions: DefaultRegion[];
}

export interface Viewport extends ViewportBase {
    width: string;
    height: string;
}