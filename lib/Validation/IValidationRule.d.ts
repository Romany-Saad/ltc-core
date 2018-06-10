export default interface IValidationRule {
    (value: any, obj: any): boolean;
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
