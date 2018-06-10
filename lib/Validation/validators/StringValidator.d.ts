import { ValidatorBase } from "../ValidatorBase";
export default class StringValidator extends ValidatorBase {
    minLength(minLength: number): this;
    maxLength(maxLength: number): this;
    matches(regex: RegExp): this;
    protected readonly type: string;
}
