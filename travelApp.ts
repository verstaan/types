import { MultiPolygon, Polygon, Point, FeatureCollection, GeometryCollection, Feature } from "geojson";
import { DeviceType } from "./auth";


export interface UserCharacteristics {
    sex?: string;
    bday?: string;
    socioecon?: number; // from 1-5, how wealthy are they? could be a slider input on the FE?
    socialstatus?: "unknown" | "mildly wellknown" | "famous" | "very famous";
    sexualorientation?: string;
}

export interface DestinationCharacteristics {
    crowded_factors?: string[];
    time_in_public?: number; // out of 10, 10 being the most time in public
    reason_for_going?: "business" | "personal";
    time_windows?: string[];
    has_children?: boolean;
    party_size?: number;
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
    payment_method_id: string;
    price: number;
}

export interface TravelTrip {
    id: number;
    name: string;
    trip_start: Date;
    trip_end: Date;
    trip_owner: number;
    travel_group_id: number | null;
    attending_users: number[];
    singular_dest: boolean;
    status: "pending" | "confirmed" | "payment_failed";
}

export interface EmergencyContact {
    name: string;
    email?: string;
    phone: number;
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
    stripe_customer_id?: string;
}

export interface TravelAccommodation {
    name: string;
    point: Point;
    accommodation_type?: string;
    acc_start: Date;
    acc_end: Date;
    address: string;
}

export interface TravelNewDestination {
    name: string;
    pointLocation: Point;
    destinationCharacteristics: DestinationCharacteristics;
    destinationType?: string;
    accommodations: TravelAccommodation[];
    dest_start: Date;
    dest_end: Date;
    country_abbr: string;
}

export interface TravelDestination {
    id: number;
    name: string;
    trip_id: number;
    group_id: number | null;
    point_location: Point;
    destination_characteristics: DestinationCharacteristics;
    country_abbr: string;
    accommodations: TravelAccommodation[];
    dest_start: Date;
    dest_end: Date;
}

export interface CityVendorItem {
	names: string;
	contact_info: string;
	description: string;
}

export interface CityInsightItem {
	text: string;
	tags: string[];
}

export interface TravelCityInsights {
    emergency_services?: CityInsightItem[];
	transportation?: CityInsightItem[];
	communication?: CityInsightItem[];
	scams?: CityInsightItem[];
	finances?: CityInsightItem[];
	women?: CityInsightItem[];
	general_security?: CityInsightItem[];
}

export interface AnalystGeometry {
    type: "safety_point" | "safety_polygon" | "nonviolent_point" | "nonviolent_polygon" | "violent_point" | "violent_polygon" | "geonews_point" | "analystnote_point";
    category: string;
    geometry: any;
    description: string;
    news_source?: string;
    news_link?: string;
    tags?: string;
    time_bins?: string;
    reason_for_including?: string;
}

export interface SecondaryDestinationOutputs {
    analyst_geometry: AnalystGeometry[];
    combined_feed: TravelPriorityFeedItem[];
    city_insights: TravelCityInsights;
    city_vendors: CityVendorItem[];
}

export interface TravelUniversalGeometry {
    type: "safety_polygon" | "violent_polygon" | "nonviolent_polygon" | "safety_point" | "violent_point" | "nonviolent_point" | "analystnote_point" | "geonews_point",
    category: string;
    geometry: FeatureCollection;
    description: string;
    news_source?: string;
    news_link?: string;
    country_abbr?: string;
    internal_memo?: string;
    links: number[];
    local_review?: string;
}


export interface AnalystNote {
    title: string;
    text: string;
    links: number[];
}

export interface DestinationOutputs {
    id: number // same as destination id for given destination
    user_id: number;
    trip_id: number;
    kde_violent: FeatureCollection | null;
    kde_nonviolent: FeatureCollection | null;
    rt_prop: JSON[];
    indices: TravelIndex[];
    analyst_notes: AnalystNote[];
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
    name: string;
    fullname: string;
    score: string;
    severity: number;
    source: string;
    links: number[];
    description: string;
}

export interface TravelCountryProfile {
    id: number;
    abbr: string;
    name: string;
    //overall_safety_ranking: number;
    indices: TravelIndex[];
    highlights?: string;
}

export interface TravelOSINT {
    id: number;
    report_type_v2: string;
    category: "violent" | "nonviolent";
    point: Point;
    description: string;
    country_abbr: string;
}

export interface TravelCityProfile {
    id: number;
    geometry: GeometryCollection | MultiPolygon | Polygon | FeatureCollection | Feature;
    center_coords: [number, number];
    country_abbr: string;
    name: string;
    safety_insights: TravelCityInsights;
    safety_vendors: CityVendorItem[];
    highlights?: string;
}

export interface TravelNewsHeadlines {
    headline: string;
    description: string;
    source: string;
    link: string;
    pubDate: Date;
    img_url?: string;
    country: string;
}

export interface TravelPriorityFeedItem {
    id: number;
    header: string;
    text: string;
    type: "analyst_note" | "index";
    severity?: number;
    links: number[]
}

export interface TravelDraftTrip {
    //id: number;
    user_id: number;
    datetime_saved: Date;
    trip_name?: string;
    trip_start?: Date;
    trip_end?: Date;
    trip_destinations?: {
        name?: string;
        pointLocation?: Point;
        destinationCharacteristics?: DestinationCharacteristics;
        destinationType?: string;
        accommodations?: {
            name?: string;
            point?: Point;
            accommodation_type?: string;
            acc_start?: Date;
            acc_end?: Date;
        }[];
        dest_start?: Date;
        dest_end?: Date;
    }[]

}

export interface TravelDevice {
    user_id: number;
    token: string | null;
    device_type: DeviceType;
    device_fingerprint: string;
    point?: Point;
    modified_at?: Date;
    user_name?: string;
}