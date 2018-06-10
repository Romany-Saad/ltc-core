import StringValidator from "./StringValidator";
import { ValidatorBase } from "../ValidatorBase";
import NumberValidator from "./NumberValidator";
export default class ObjectValidator extends ValidatorBase {
    constructor(path?: string, parent?: ObjectValidator);
    string(name: string): StringValidator;
    number(name: string): NumberValidator;
    protected readonly type: string;
}
