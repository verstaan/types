import { MultiPolygon, Polygon } from "geojson";

export interface TripCharacteristics {
    has_children: boolean | null;
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

