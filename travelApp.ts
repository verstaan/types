import { MultiPolygon, Polygon, Point, FeatureCollection, GeometryCollection, Feature } from "geojson";


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
}

export interface TravelAccommodation {
    name: string;
    point: Point;
    accommodation_type?: string;
    acc_start: Date;
    acc_end: Date;
}

export interface TravelNewDestination {
    name: string;
    pointLocation: Point;
    destinationCharacteristics: DestinationCharacteristics;
    destinationType?: string;
    accomodations: TravelAccommodation[];
    dest_start: Date;
    dest_end: Date;
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
    time_bins?: string
}

export interface SecondaryDestinationOutputs {
    analyst_geometry: AnalystGeometry[];
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
}

export interface DestinationOutputs {
    id: number // same as destination id for given destination
    user_id: number;
    trip_id: number;
    kde_violent: FeatureCollection | null;
    kde_nonviolent: FeatureCollection | null;
    rt_prop: JSON[];
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
    rank?: number
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

export interface TravelCityProfile {
    id: number;
    geometry: GeometryCollection | MultiPolygon | Polygon | FeatureCollection | Feature;
    center_coords: [number, number];
    country_abbr: string;
    name: string;
    safety_insights: TravelCityInsights;
    safety_vendors?: CityVendorItem[];
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