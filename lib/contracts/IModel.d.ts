import { IStringKeyedObject, ISerializable } from "./";
export default interface IModel extends ISerializable {
    getIdFieldName(): string;
    set(data: IStringKeyedObject): void;
    get(key: string): any;
    setId(id: string): void;
    getId(): string;
    getSchema(): IStringKeyedObject | string;
    selfValidate(): boolean;
    getErrors(): object;
}
