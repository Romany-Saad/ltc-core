import { IStringKeyedObject } from "./"

export default interface ISerializable {
  /*
  * serializes a given IModel instance into a plain JS object
  * */
  serialize (): IStringKeyedObject
}
