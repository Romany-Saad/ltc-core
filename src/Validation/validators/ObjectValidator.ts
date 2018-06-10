import StringValidator from "./StringValidator"
import { ValidatorBase } from "../ValidatorBase"
import NumberValidator from "./NumberValidator"


export default class ObjectValidator extends ValidatorBase {
  constructor (path: string = "", parent: ObjectValidator = null) {
    super(path, parent)
  }

  string (name: string): StringValidator {
    return new StringValidator(`${this.path}/${name}`, this)
  }

  number (name: string) {
    return new NumberValidator(`${this.path}/${name}`, this)
  }

  protected get type (): string {
    return "object"
  }
}
