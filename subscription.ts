import {Point} from "geojson";

export class SubscriptionData {
    public user_id: number | undefined;
    public client_id: number | undefined;
    public token: string | undefined;
    public device_type: string | undefined;
    public device_fingerprint: string | undefined;
    public point: Point | undefined;
    public modified_at: Date | undefined;

    constructor(init?: Partial<SubscriptionData>) {
        Object.assign(this, init);
    }

    checkInfo(): boolean {
        return (
            this.user_id != undefined &&
            this.client_id != undefined &&
            this.token != undefined &&
            this.device_fingerprint!= undefined &&
            this.device_type != undefined &&
            (this.device_type.toLowerCase() == "web" ||
            this.device_type.toLowerCase() == "mobile")
        )
    }
}
