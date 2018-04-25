export default interface IModel {
  parse (data: object): IModel
  serialize (item: IModel): object
}
