import { ErrorObject, ValidateFunction } from "ajv"
import { IModel, IStringKeyedObject } from "../contracts"
import { yamlSchemaLoader, isSerializable } from "../utils"

export default abstract class BaseModel implements IModel {
  protected data: IStringKeyedObject = {}
  protected id: string = undefined
  protected validateFunction: ValidateFunction = undefined

  constructor (data: IStringKeyedObject = undefined) {
    this.set(data)
  }

  setId (id: string): void {
    this.id = id
  }

  getId (): string {
    return this.id
  }

  getIdFieldName (): string {
    return "_id"
  }

  serialize (): IStringKeyedObject {
    const serialized: IStringKeyedObject = {}
    serialized[this.getIdFieldName()] = this.getId()
    Object.keys(this.data).forEach((key) => {
      const value = this.data[key]
      serialized[key] = typeof value === "object" && isSerializable(value) ? value.serialize() : value
    })

    return Object.assign({}, serialized)
  }

  set (data: IStringKeyedObject): void {
    if (data && data[this.getIdFieldName()]) {
      this.setId(data[this.getIdFieldName()])
      delete data[this.getIdFieldName()]
    }
    this.data = Object.assign({}, this.data, data)
  }

  get (key: string): any {
    if (key === this.getIdFieldName()) return this.getId()
    return this.data[key]
  }

  selfValidate (): boolean {
    if (!this.validateFunction) {
      const schema = this.getSchema()
      let id: string
      if (typeof schema === "string") {
        id = yamlSchemaLoader.loadSchema(schema)
      } else if (typeof schema === "object") {
        yamlSchemaLoader.addSchema(schema)
        id = schema["$id"]
      }
      if (!id) throw new Error("schema not found")
      this.validateFunction = yamlSchemaLoader.getSchema(id)
    }
    return <boolean>this.validateFunction(this.serialize())
  }

  getErrors (): ErrorObject[] {
    return this.validateFunction.errors
  }

  abstract getSchema (): IStringKeyedObject | string
}
