import { ValidatorBase } from "../ValidatorBase"
import { ContainingType } from "../intefaces"

export default class NumberValidator extends ValidatorBase {

  constructor (parent: ContainingType) {
    super(parent)

    // attaching default validator
    this.addValidator('number', (value: number, obj: any, path: string): boolean => {
      return !isNaN(value)
    }, {})
  }

  integer () {
    this.addValidator('integer', (value: number, obj: any, path: string): boolean => {
      return Number.isInteger(value)
    }, {})
    return this
  }

  min (min: number, exclusive: boolean = false) {
    this.addValidator('min', (value: number, obj: any, path: string): boolean => {
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

  get type (): string {
    return "number"
  }
}
