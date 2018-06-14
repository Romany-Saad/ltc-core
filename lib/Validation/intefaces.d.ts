import ObjectValidator from "./validators/ObjectValidator";
import ArrayValidator from "./validators/ArrayValidator";
export interface IValidator {
    type: string;
    _: ContainingType;
    validate(value: any, path: string): IValidationResult;
}
export default interface IValidationRule {
    (value: any, obj: any, path: string): boolean;
}
export interface IValidationResult {
    success: boolean;
    messages: IValidationMessage[];
    errors: IValidationError[];
}
export interface IValidationMessage {
    code: string;
    params: object;
}
export interface IValidationError {
    rule: string;
    dataPath: string;
    params: object;
}
export interface IValidationSet {
    [key: string]: {
        validate: IValidationRule;
        params: object;
    };
}
export declare type ContainingType = ObjectValidator | ArrayValidator;
