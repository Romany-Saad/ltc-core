import { ISerializable } from "../contracts/index"
import yamlSchemaLoader from "./YamlSchemaLoader"

export const isSerializable = (object: any): object is ISerializable => {
  if (!object || typeof object !== "object") return false
  return 'serialize' in object && typeof object.serialize === "function"
}

class namer {
  static resolve (plugin: string, resource: string, what: string) {
    return `${plugin}.${resource}.${what}`
  }
}

export { yamlSchemaLoader, namer }
