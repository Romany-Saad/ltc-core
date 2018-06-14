import StringValidator from "./StringValidator";
import { ValidatorBase } from "../ValidatorBase";
import NumberValidator from "./NumberValidator";
import { ContainingType, IValidationResult, IValidator } from "../intefaces";
import ArrayValidator from "./ArrayValidator";
export default class ObjectValidator extends ValidatorBase {
    protected readonly path: string;
    private requiredProps;
    private typeValidators;
    constructor(path?: string, parent?: ContainingType);
    readonly type: string;
    required(...properties: string[]): this;
    addTypeValidator<T extends IValidator>(name: string, validator: T): T;
    array(name: string): ArrayValidator;
    object(name: string): ObjectValidator;
    string(name: string): StringValidator;
    number(name: string): NumberValidator;
    validate(value: any, path?: string): IValidationResult;
}
