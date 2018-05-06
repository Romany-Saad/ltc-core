import { IStringKeyedObject, ISerializable } from "./";
export default interface IModel extends ISerializable {
    parse(data: IStringKeyedObject): IModel;
    getIdFieldName(): string;
    set(data: IStringKeyedObject): void;
    setId(id: string): void;
    getId(): string;
}
