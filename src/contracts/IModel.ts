export default interface IModel {
  /*
  * parses a given plain JS object into an IModel instance
  * */
  parse (data: object): IModel

  /*
  * serializes a given IModel instance into a plain JS object
  * */
  serialize (model: IModel): object
}
