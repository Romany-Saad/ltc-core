import BaseModel from "../abstractions/BaseModel"
import { IStringKeyedObject } from "../contracts"

export default class ContactEmail extends BaseModel {
  schema = {
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
  }

  parse (data: IStringKeyedObject): ContactEmail {
    return new ContactEmail(data)
  }
}
