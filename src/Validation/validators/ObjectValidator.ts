import StringValidator from "./StringValidator"
import { ValidatorBase } from "../ValidatorBase"
import NumberValidator from "./NumberValidator"
import { ContainingType, IValidationResult, IValidator } from "../intefaces"
import { get, has, set } from "json-pointer"
import { combineValidationResults } from "../utils"
import ArrayValidator from "./ArrayValidator"

const getPath = (name: string): string => (name.charAt(0) === "/") ? name : "/" + name

export default class ObjectValidator extends ValidatorBase {
  protected readonly path: string
  private requiredProps: string[] = []
  private typeValidators: { [path: string]: IValidator } = {}

  // todo add types: number(float /integer) , string, boolean, array, object
  constructor (path: string = "", parent: ContainingType = null) {
    super(parent)
    this.path = path
  }

  get type (): string {
    return "object"
  }

  required (...properties: string[]) {
    this.requiredProps = properties
    return this
  }

  addTypeValidator<T extends IValidator> (name: string, validator: T): T {
    const pointer = `/${name}`
    if (has(this.typeValidators, pointer)) return get(this.typeValidators, pointer)
    set(this.typeValidators, pointer, validator)
    return validator
  }

  array (name: string): ArrayValidator {
    return this.addTypeValidator<ArrayValidator>(name, new ArrayValidator(getPath(name), this))
  }

  object (name: string): ObjectValidator {
    return this.addTypeValidator<ObjectValidator>(name, new ObjectValidator(getPath(name), this))
  }

  string (name: string): StringValidator {
    return this.addTypeValidator<StringValidator>(name, new StringValidator(this))
  }

  number (name: string): NumberValidator {
    return this.addTypeValidator<NumberValidator>(name, new NumberValidator(this))
  }

  // add validation rule requires
  validate (value: any, path: string = ""): IValidationResult {
    let result: IValidationResult = {success: true, messages: [], errors: []}

    // checking required properties
    this.requiredProps.forEach(property => {
      if (!has(value, `${path}/${property}`)) {
        result.success = false
        result.errors.push({params: {property}, dataPath: path, rule: "object.required"})
      }
    })

    if (has(value, path)) {
      const target = get(value, path)
      // loops over validators and build the validation result
      Object.keys(this.validators).forEach(rule => {
        const validator = this.validators[rule]
        if (!validator.validate(target, value, path)) {
          result.success = false
          result.errors.push({
            rule: `${this.type}.${rule}`,
            dataPath: path,
            params: validator.params
          })
        }
      })
    }

    Object.keys(this.typeValidators).forEach(propertyName => {
      const path = [this.path, propertyName].join("/")
      const propertyResult: IValidationResult =
        this.typeValidators[propertyName]
          .validate(value, path)
      result = combineValidationResults(result, propertyResult)
    })

    return result
  }
}
