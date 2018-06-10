import { ValidatorBase } from "../ValidatorBase"

export default class NumberValidator extends ValidatorBase {
  min (min: number, exclusive: boolean = false) {
    this.addValidator('min', (value: number, obj: any): boolean => {
      return (exclusive) ? value > min : value >= min
    }, {min})
    return this
  }

  max (max: number, exclusive: boolean = false) {
    this.addValidator('min', (value: number, obj: any): boolean => {
      return (exclusive) ? value < max : value <= max
    }, {max})
    return this
  }

  multipleOf (modulus: number) {
    this.addValidator('multipleOf', (value: number, obj: any): boolean => {
      return value % modulus === 0
    }, {modulus})
    return this
  }

  protected get type (): string {
    return "number"
  }
}
