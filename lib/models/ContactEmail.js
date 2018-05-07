"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("../abstractions/BaseModel");
class ContactEmail extends BaseModel_1.default {
    constructor() {
        super(...arguments);
        this.schema = {
            "type": "object",
            "required": ["address", "name"],
            "properties": {
                "address": {
                    "type": "string",
                    "format": "email",
                    "maxLength": 128
                },
                "name": {
                    "type": "string",
                    "maxLength": 128
                }
            }
        };
    }
    parse(data) {
        return new ContactEmail(data);
    }
}
exports.default = ContactEmail;
