import { ISerializable } from "./contracts"

export const isSerializable = (object: any): object is ISerializable => {
  return 'serialize' in object && typeof object.serialize === "function"
}
