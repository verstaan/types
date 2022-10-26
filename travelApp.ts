import { MultiPolygon, Polygon, Point, FeatureCollection } from "geojson";

export interface TripCharacteristics {
    has_children?: boolean;
    party_size?: number;
}

export interface UserCharacteristics {
    sex?: string;
    bday?: string;
    socioecon?: number; // from 1-5, how wealthy are you?
    socialstatus?: "unknown" | "mildly wellknown" | "famous" | "very famous";
    sexualorientation?: string;
}

export interface DestinationCharacteristics {
    crowded_factors?: string[];
    time_in_public?: number; // out of 10, 10 being the most time in public
    reason_for_going?: "business" | "personal";
    time_windows?: string[];
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
    trip_owner: number;
    travel_group_id: number | null;
    attending_users: number[];
}

export interface EmergencyContact {
    name: string;
    email: string;
    phone?: number;
    relationship?: string;
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
    forgotpass_exp: Date;
    emergency_contacts: EmergencyContact[];
}

export interface TravelNewDestination {
    name: string;
    pointLocation: Point;
    destinationCharacteristics: DestinationCharacteristics;
    destinationType: string;
}

export interface TravelDestination {
    id: number;
    name: string;
    trip_id: number;
    group_id: number | null;
    point_location: Point;
    destination_characteristics: DestinationCharacteristics;
    destination_type: string | null;
    country_abbr: string;
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
    indices: TravelIndices;
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

export interface TravelIndex {
    fullname: string;
    score: string | number;
    severity: number;
    source: string;
}

export interface TravelIndices {
    womenpeacesecurity?: TravelIndex; // Georgetown's Global Women Peace and Security Index
    lgbt_asherlyric?: TravelIndex; // Asher and Lyric's LGBT Travel Safety Index (2022)
    gini_index?: TravelIndex; // World Bank's Gini Index, measures income inequality
    gpi?: TravelIndex; // From the Institute for Economics and Peace (IEP), the Global Peace Index (GPI)
    humantrafficking?: TravelIndex; // Human Trafficking Index, Global Organized Crime Index
}

export interface TravelCountryProfile {
    id: number;
    abbr: string;
    name: string;
    overall_safety_ranking: number;
    indices: TravelIndices;
}

export interface TravelOSINT {
    id: number;
    report_type_v2: string;
    category: "violent" | "nonviolent";
    point: Point;
    description: string;
    country_abbr: string;
}