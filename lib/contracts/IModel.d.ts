export default interface IModel {
    parse(data: object): IModel;
    serialize(model: IModel): object;
    getIdFieldName(): string;
    set(data: object): void;
    setId(id: string): void;
    getId(): string;
}
