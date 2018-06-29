import { ISerializable } from "../contracts/index"
import yamlSchemaLoader from "./YamlSchemaLoader"

export const isSerializable = (object: any): object is ISerializable => {
  if (!object || typeof object !== "object") return false
  return 'serialize' in object && typeof object.serialize === "function"
}

export { yamlSchemaLoader }
