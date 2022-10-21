import { request } from "./index";
import { TripCharacteristics, TravelNewDestination, UserCharacteristics } from "../travelApp";


export const createPendingTrip = (userId: number, tripName: string, tripStart: Date, tripEnd: Date, tripCharacteristics: TripCharacteristics, tripDestinations: TravelNewDestination[]): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/createPendingTrip",
        data: {userId, tripName, tripStart, tripEnd, tripCharacteristics, tripDestinations}
    });

export const submitPendingTravelUser = (email: string, password: string, first_name: string, last_name: string, userCharacteristics: UserCharacteristics): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/submitPendingTravelUser",
        data: {email, password, first_name, last_name, userCharacteristics}
    });

export const validatePendingTravelUser = (user_id: number, verif_code: string): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/validatePendingTravelUser",
        data: {user_id, verif_code}
    });

export const fetchTravelUserData = (user_id: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/fetchTravelUserData",
        data: {user_id}
    });

export const isDestinationSupported = (latitude: number, longitude: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/isDestinationSupported",
        data: {latitude, longitude}
    });