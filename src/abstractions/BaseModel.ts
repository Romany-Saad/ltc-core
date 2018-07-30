import { IModel, IStringKeyedObject } from "../contracts"
import { isSerializable } from "../utils"
import { Context } from "c2v"
import { ITypeValidator, IValidationResult } from "c2v/lib/contracts"

export default abstract class BaseModel implements IModel {
  protected id: string = undefined
  protected data: IStringKeyedObject = {}
  protected schema: ITypeValidator = undefined
  protected state: IValidationResult = undefined

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

  selfValidate (): Promise<IValidationResult> {
    const validation = Context.validate(this.getSchema(), this.serialize())
    try {
      return validation
    } finally {
      validation.then((result: IValidationResult) => {
        this.state = result
      })
    }
  }

  getResult (): IValidationResult {
    return this.state
  }

  getSchema (): ITypeValidator {
    return this.schema
  }
}
