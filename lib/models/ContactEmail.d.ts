import BaseModel from "../abstractions/BaseModel";
import { IStringKeyedObject } from "../contracts";
export default class ContactEmail extends BaseModel {
    schema: {
        "type": string;
        "required": string[];
        "properties": {
            "address": {
                "type": string;
                "format": string;
                "maxLength": number;
            };
            "name": {
                "type": string;
                "maxLength": number;
            };
        };
    };
    parse(data: IStringKeyedObject): ContactEmail;
}
