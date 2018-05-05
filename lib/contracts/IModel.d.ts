import IStringKeyedObject from "./IStringKeyedObject";
export default interface IModel {
    parse(data: IStringKeyedObject): IModel;
    serialize(): IStringKeyedObject;
    getIdFieldName(): string;
    set(data: IStringKeyedObject): void;
    setId(id: string): void;
    getId(): string;
}
