import { ValidatorBase } from "../ValidatorBase";
export default class NumberValidator extends ValidatorBase {
    min(min: number, exclusive?: boolean): this;
    max(max: number, exclusive?: boolean): this;
    multipleOf(modulus: number): this;
    protected readonly type: string;
}
