import IValidationRule, { IValidationResult } from "./IValidationRule"
import ObjectValidator from "./validators/ObjectValidator"
import { get } from "json-pointer"

interface IValidationSet {
  [key: string]: {
    validate: IValidationRule
    params: object
  }
}

export abstract class ValidatorBase {
  private validators: IValidationSet = {}
  protected readonly path: string
  private readonly parent: ObjectValidator

  constructor (path: string = "", parent: ObjectValidator = null) {
    this.path = path
    this.parent = parent
  }

  protected abstract get type (): string

  addValidator (name: string, validator: IValidationRule, params: object) {
    this.validators[name] = {
      validate: validator,
      params
    }
  }

  validate (value: any) {
    const result: IValidationResult = {success: true, messages: [], errors: []}
    const validated = get(value, this.path)
    // loops over validators and build the validation result
    Object.keys(this.validators).forEach(rule => {
      const validator = this.validators[rule]
      if (!validator.validate(validated, value)) {
        result.success = false
        result.errors.push({rule: `${this.type}.${rule}`, dataPath: this.path, params: validator.params})
      }
    })
    return result
  }

  // returns parent object
  get _ (): ObjectValidator {
    return this.parent
  }
}
