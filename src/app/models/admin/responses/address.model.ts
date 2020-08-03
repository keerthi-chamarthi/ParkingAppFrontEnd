import { Deserializable } from "./deserializable.model";
export class Address {
    sitecode: string;
    sitename: string;
    lane: string;
    landmark: string;
    area : string;
    place : string;
    pincode : string;
    state : string;
    country: string;
    dayslotamount: number;
    nightslotamount: number;
    sessiontoken: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
    
}
