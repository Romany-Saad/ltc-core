import { IModel, IStringKeyedObject } from "../contracts"
import { isSerializable } from "../utils"
import { Context } from "c2v"
import { ITypeValidator, IValidationResult } from "c2v/lib/contracts"
import { compare } from "fast-json-patch"
import { merge, cloneDeep } from "lodash"

export default abstract class BaseModel implements IModel {
  protected id: string = undefined
  protected data: IStringKeyedObject = {}
  protected schema: ITypeValidator = undefined
  protected state: IValidationResult = undefined
  protected dbState: object = {}

  constructor (data: IStringKeyedObject = undefined) {
    this.set(cloneDeep(data))
  }

  getDbState (): object {
    return cloneDeep(this.dbState)
  }

  updateDbState (): void {
    this.dbState = this.serialize()
  }

  serialize (): IStringKeyedObject {
    const serialized: IStringKeyedObject = {}
    serialized[this.getIdFieldName()] = this.getId()
    Object.keys(this.data).forEach((key) => {
      const value = this.data[key]
      serialized[key] = typeof value === "object" && isSerializable(value) ? value.serialize() : value
    })

    return cloneDeep(serialized)
  }

  set (data: IStringKeyedObject): void {
    if (data && data[this.getIdFieldName()]) {
      this.setId(data[this.getIdFieldName()])
      delete data[this.getIdFieldName()]
    }
    this.data = merge({}, this.data, data)
  }

  get (key: string): any {
    if (key === this.getIdFieldName()) return this.getId()
    return this.data[key]
  }

  getIdFieldName (): string {
    return "_id"
  }

  setId (id: string): void {
    this.id = id
  }

  getId (): string {
    return this.id
  }

  getUpdatePatch (): Array<object> {
    const initState: any = this.dbState
    const currentState: any = this.serialize()

    delete initState[this.getIdFieldName()]
    delete currentState[this.getIdFieldName()]

    return compare(initState, currentState)
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
