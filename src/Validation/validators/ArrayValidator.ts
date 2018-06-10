import { ValidatorBase } from "../ValidatorBase"

export class ArrayItemsValidator {
  string () {

  }
}

export default class ArrayValidator extends ValidatorBase {

  minItems (limit: number) {
    this.addValidator('minItems', (value: any[], obj: any): boolean => {
      return value.length >= limit
    }, {limit})
    return this
  }

  maxItems (limit: number) {
    this.addValidator('maxItems', (value: any[], obj: any): boolean => {
      return value.length <= limit
    }, {limit})
    return this
  }

  items () {

  }

  nth (index: number) {

  }

  protected get type (): string {
    return "array"
  }
}
