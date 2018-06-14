import { get, has, set } from "json-pointer"
import IValidationRule, { ContainingType, IValidationResult, IValidationSet, IValidator } from "./intefaces"
import { error } from "util"

export abstract class ValidatorBase implements IValidator {
  protected validators: IValidationSet = {}
  protected readonly parent: ContainingType

  public abstract get type (): string

  public constructor (parent: ContainingType = null) {
    this.parent = parent
  }

  addValidator (name: string, validator: IValidationRule, params: object) {
    const pointer = `/${name}`
    if (has(this.validators, pointer))
      throw new Error(`validator with the same name ${name} already exists`)

    set(this.validators, pointer, {
      validate: validator,
      params
    })
  }

  validate (value: any, path: string = ""): IValidationResult {
    return this.selfValidate(value, path)
  }

  protected selfValidate (value: any, path: string = ""): IValidationResult {
    const result: IValidationResult = {success: true, messages: [], errors: []}
    const validated = get(value, path)
    // loops over validators and build the validation result
    Object.keys(this.validators).forEach(rule => {
      const validator = this.validators[rule]
      if (!validator.validate(validated, value, path)) {
        result.success = false
        result.errors.push({rule: `${this.type}.${rule}`, dataPath: path, params: validator.params})
      }
    })
    return result
  }

  // returns parent object
  get _ (): ContainingType {
    return this.parent
  }
}
