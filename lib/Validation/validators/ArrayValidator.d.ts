import { ValidatorBase } from "../ValidatorBase";
export declare class ArrayItemsValidator {
    string(): void;
}
export default class ArrayValidator extends ValidatorBase {
    minItems(limit: number): this;
    maxItems(limit: number): this;
    items(): void;
    nth(index: number): void;
    protected readonly type: string;
}
