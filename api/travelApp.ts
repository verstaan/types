import { request } from "./index";
import { TravelDraftTrip, TravelNewDestination, UserCharacteristics } from "../travelApp";
import { DeviceSubscription } from "../auth";
import { Point } from "geojson";


export const createPendingTrip = (userId: number, tripName: string, tripDestinations: TravelNewDestination[], paymentMethodId: string, price: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/createPendingTrip",
        data: {userId, tripName, tripDestinations, paymentMethodId, price}
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

export const fetchTravelUserData = (): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/fetchTravelUserData",
        //data: {user_id}
    });

export const isDestinationSupported = (latitude: number, longitude: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/isDestinationSupported",
        data: {latitude, longitude}
    });

export const subscribeTravelDevice = (sub: DeviceSubscription): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/travelApp/subscribeTravelDevice",
        data: {
            ...sub
        }
    });

export const getTravelUserAuthStatus = (email: string): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/getTravelUserAuthStatus",
        data: {email}
    });

export const alertEmergencyContacts = (user_id: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/alertEmergencyContacts",
        data: {user_id}
    });

export const saveStripePaymentMethod = (user_id: number, success_url: string, cancel_url: string): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/saveStripePaymentMethod",
        data: {user_id, success_url, cancel_url}
    });

// export const fetchStripeCheckoutSession = (): Promise<any> => 
//     request<any>(true, {
//         method: "get",
//         url: "/travelApp/fetchStripeCheckoutSession/:id",
//         //data: {user_id}
//     });

export const isTripPending = (user_id: number, trip_id: number): Promise<any> => 
    request<any>(true, {
        method: "get",
        url: "/travelApp/isTripPending",
        data: {user_id, trip_id}
    });

export const fetchStripePaymentMethods = (user_id: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/fetchStripePaymentMethods",
        data: {user_id}
    });

export const chargeStripePayment = (user_id: number, payment_method_id: string, amount: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/chargeStripePayment",
        data: {user_id, payment_method_id, amount}
    });

export const saveDraftTrip = (newDraft: TravelDraftTrip): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/saveDraftTrip",
        data: {newDraft}
    });

export const retrieveLatestDraftTrip = (user_id: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/retrieveLatestDraftTrip",
        data: {user_id}
    });

export const updateTravelSubscription = (token: string, device_fingerprint: string, point?: Point): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/travelApp/updateTravelSubscriptionToken",
        data: {
            token,
            device_fingerprint,
            point
        }
    });

export const removeTravelSubscription = (device_fingerprint: string): Promise<void> =>
    request<void>(true, {
        method: "post",
        url: "/travelApp/removeTravelSubscriptionToken",
        data: {
            device_fingerprint
        }
    });

export const fetchCountryHeadlines = (country_abbr: string): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/fetchCountryHeadlines",
        data: {country_abbr}
    });

export const retrieveDraftTripById = (draft_id: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/retrieveDraftTripById",
        data: {draft_id}
    });