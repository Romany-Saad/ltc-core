import { IStringKeyedObject, ISerializable } from "./";
import { ITypeValidator, IValidationResult } from "c2v/lib/intefaces";
export default interface IModel extends ISerializable {
    getIdFieldName(): string;
    set(data: IStringKeyedObject): void;
    get(key: string): any;
    setId(id: string): void;
    getId(): string;
    getSchema(): ITypeValidator;
    selfValidate(): Promise<IValidationResult>;
    getResult(): IValidationResult;
}
