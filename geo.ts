import { Polygon, MultiPolygon } from "geojson";

/**
 *
 * Defines types relevant to general geographies
 *
 */

export interface Container {
    id: number;
    area: Polygon | MultiPolygon;
    name: string;
    viewport_mobile: ViewportBase;
    viewport_web: ViewportBase;
    abbreviation?: string;
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

export interface MultiDimGeoAttribution {
    container_id_arr: number[];
    default_region_id_arr: number[];
}

export interface ContainerResponseItem {
    containers: Container[];
    default_regions: DefaultRegion[];
}

export interface ViewportBase {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface Viewport extends ViewportBase {
    width: string;
    height: string;
}
