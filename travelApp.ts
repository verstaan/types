import { MultiPolygon, Polygon, Point, FeatureCollection } from "geojson";

export interface TripCharacteristics {
    has_children: boolean | null;
}

export interface UserCharacteristics {
    sex: string;
    socioecon: string;
}

export interface DestinationCharacteristics {
    crowded_factors: string[];
    time_in_public: number // out of 10, 10 being the most time in public
}

export interface TravelTrip {
    id: number;
    name: string;
    travel_group_id: number | null;
    trip_start: Date;
    trip_end: Date;
    trip_characteristics: TripCharacteristics;
    is_pending: Boolean;
    trip_owner: number;
}

export interface TravelUser {
    email: string;
    date_joined: string;
    first_name: string;
    last_name: string;
    user_characteristics: UserCharacteristics;
    is_pending: boolean;
}

export interface TravelDestination {
    name: string;
    trip_id: number;
    group_id: number | null;
    point_location: Point;
    destination_characteristics: DestinationCharacteristics;
    destination_type: string | null;
}

export interface DestinationOutputs {
    kde_violent: FeatureCollection;
    kde_nonviolent: FeatureCollection;
    rt_prop: JSON;
}