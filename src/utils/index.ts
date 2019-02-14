import { ISerializable } from "../contracts/index"

export const isSerializable = (object: any): object is ISerializable => {
  if (!object || typeof object !== "object") return false
  return 'serialize' in object && typeof object.serialize === "function"
}

class namer {
  static resolve (plugin: string, resource: string, what: string) {
    return `${plugin}.${resource}.${what}`
  }
}

const merge = (...items: Array<any>) => {
  let result = {}
  for (let item of items) {
    result = { ...result, ...item }
  }
  return result
}

export { namer, merge }
