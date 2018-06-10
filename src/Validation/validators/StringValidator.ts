import { ValidatorBase } from "../ValidatorBase"


export default class StringValidator extends ValidatorBase {
    minLength (minLength: number) {
      this.addValidator('minLength', (value: string, obj: any): boolean => {
        return value.length >= minLength
      }, {minLength})
      return this
    }

    maxLength (maxLength: number) {
      this.addValidator('maxLength', (value: string, obj: any): boolean => {
        return value.length <= maxLength
      }, {maxLength})
      return this
    }

    matches (regex: RegExp) {
      this.addValidator('matches', (value: string, obj: any): boolean => {
        return regex.test(value)
      }, {regex})
      return this
    }

    protected get type (): string {
      return "string"
    }
  }

