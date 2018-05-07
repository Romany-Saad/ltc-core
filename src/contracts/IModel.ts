import { IStringKeyedObject, ISerializable } from "./"

export default interface IModel extends ISerializable {
  /*
  * parses a given plain JS object into an IModel instance
  * */
  parse (data: IStringKeyedObject): IModel

  /*
  * returns the name of the id field to be used in setId
  * */
  getIdFieldName (): string

  /*
  * sets all the keys of `data` object to the inner state of the model also
  * if a key is equal to value from `getIdFieldName()` it will should be
  * handled handle by using `setId()` instead of directly setting it
  * */
  set (data: IStringKeyedObject): void

  /*
  * sets the `id` property of the model and do any aside logic related to this operation
  * */
  setId (id: string): void

  /*
  * returns the model `id` property
  * */
  getId (): string

  /*
  * returns the schema used to validate the state of the model
  * */
  getSchema (): IStringKeyedObject

  /*
  * validates the value returned from IModel.serialize() against
  * the model's schema
  * */
  selfValidate (): boolean

  /*
  * returns an array of errors that resulted from the last validation
  * */
  getErrors (): object
}
