import Ajv = require("ajv")
import { ErrorObject, ValidateFunction } from "ajv"
import { IModel, IStringKeyedObject } from "../contracts"
import { isSerializable } from "../utils"

export default abstract class BaseModel implements IModel {
  protected data: IStringKeyedObject = {}
  protected id: string = undefined
  protected removeAdditional: boolean = true
  protected validateFunction: ValidateFunction
  protected abstract schema: IStringKeyedObject
  protected idSchema: IStringKeyedObject = {
    "type": "string",
  }

  protected constructor (data: IStringKeyedObject = undefined) {
    this.set(data)
  }

  setId (id: string): void {
    this.id = id
  }

  getId (): string {
    return this.id
  }

  abstract parse (data: IStringKeyedObject): IModel

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

    return Object.assign({}, serialized,)
  }

  set (data: IStringKeyedObject): void {
    if (data && data[this.getIdFieldName()]) {
      this.setId(data[this.getIdFieldName()])
      delete data[this.getIdFieldName()]
    }
    this.data = Object.assign({}, this.data, data)
  }

  selfValidate (): boolean {
    if (!this.validateFunction) {
      this.validateFunction =
        Ajv({removeAdditional: this.removeAdditional})
          .compile(this.getSchema())
    }

    return <boolean>this.validateFunction(this.serialize())
  }

  getErrors (): ErrorObject[] {
    return this.validateFunction.errors
  }

  getSchema (): IStringKeyedObject {
    if (!this.schema.hasOwnProperty("properties")) {
      throw new Error("schema doesn't have properties field defined")
    }
    const tempSchema = Object.assign({}, this.schema)
    tempSchema.properties[this.getIdFieldName()] = this.idSchema
    return tempSchema
  }
}
