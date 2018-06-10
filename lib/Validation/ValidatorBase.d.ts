import IValidationRule, { IValidationResult } from "./IValidationRule";
import ObjectValidator from "./validators/ObjectValidator";
export declare abstract class ValidatorBase {
    private validators;
    protected readonly path: string;
    private readonly parent;
    constructor(path?: string, parent?: ObjectValidator);
    protected readonly abstract type: string;
    addValidator(name: string, validator: IValidationRule, params: object): void;
    validate(value: any): IValidationResult;
    readonly _: ObjectValidator;
}
