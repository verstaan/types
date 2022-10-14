import { MultiPolygon, Polygon, Point, FeatureCollection } from "geojson";

export interface TripCharacteristics {
    has_children?: boolean | null;
}

export interface UserCharacteristics {
    sex?: string | null;
    bday?: string | null;
    socioecon?: string | null;
    socialstatus?: string | null;
    sexualorientation?: string | null;
}

export interface DestinationCharacteristics {
    crowded_factors?: string[];
    time_in_public?: number // out of 10, 10 being the most time in public
}

export interface TravelPendingTrip {
    id: number;
    user_id: number;
    trip_id: number;
    date_added: Date;
    group_id: number;
    still_pending: boolean;
    trip_name: string;
    user_name: string;
}

export interface TravelTrip {
    id: number;
    name: string;
    trip_start: Date;
    trip_end: Date;
    trip_characteristics: TripCharacteristics;
    is_pending: Boolean;
    trip_owner: number;
    travel_group_id: number | null;
    attending_users: number[];
}

export interface TravelUser {
    id: number;
    email: string;
    date_joined: string;
    first_name: string;
    last_name: string;
    user_characteristics: UserCharacteristics;
    is_pending: boolean;
    validation_code: string;
    validation_exp: Date;
    forgotpass_code: string;
    forgotpass_exp: Date
}

export interface TravelNewDestination {
    name: string;
    pointLocation: Point;
    destinationCharacteristics: DestinationCharacteristics;
    destinationType: string;
}

export interface TravelDestination {
    name: string;
    trip_id: number;
    group_id: number | null;
    point_location: Point;
    destination_characteristics: DestinationCharacteristics;
    destination_type: string | null;
}

export interface SecondaryDestinationOutputs {
    geo_analyst_notes: {
        note: string,
        point: Point
    }[],
    analyst_risk_polygons: {
        type: "violent" | "nonviolent",
        geometry: Polygon
    }[],
    geolocated_news: {
        title: string,
        body: string,
        point: Point,
        source: string
    }[]
}

export interface DestinationOutputs {
    id: number // same as destination id for given destination
    user_id: number;
    trip_id: number;
    kde_violent: FeatureCollection;
    kde_nonviolent: FeatureCollection;
    rt_prop: JSON;
    indices: JSON[];
    analyst_notes: string[];
    secondary: SecondaryDestinationOutputs;
}

export interface TravelUserData {
    profile: TravelUser;
    groups: [];
    trips: TravelTrip[];
    destinations: TravelDestination[];
    outputs: DestinationOutputs[];
    
}