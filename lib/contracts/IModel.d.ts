export default interface IModel {
    parse(data: object): IModel;
    serialize(model: IModel): object;
}
