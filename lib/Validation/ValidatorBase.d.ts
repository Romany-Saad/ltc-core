import IValidationRule, { ContainingType, IValidationResult, IValidationSet, IValidator } from "./intefaces";
export declare abstract class ValidatorBase implements IValidator {
    protected validators: IValidationSet;
    protected readonly parent: ContainingType;
    readonly abstract type: string;
    constructor(parent?: ContainingType);
    addValidator(name: string, validator: IValidationRule, params: object): void;
    validate(value: any, path?: string): IValidationResult;
    protected selfValidate(value: any, path?: string): IValidationResult;
    readonly _: ContainingType;
}
