import { request } from "./index";


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


export const priceTrip = (user_id: number, num_of_days: number): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/priceTrip",
        data: {user_id, num_of_days}
    });


export const saveStripePaymentMethod = (user_id: number, success_url: string, cancel_url: string): Promise<any> => 
    request<any>(true, {
        method: "post",
        url: "/travelApp/saveStripePaymentMethod",
        data: {user_id, success_url, cancel_url}
    });