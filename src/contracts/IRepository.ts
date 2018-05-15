import IStringKeyedObject from "./IStringKeyedObject"

export default interface IRepository<T> {

  /*
  * inserts a set of items into collection
  * */
  insert (items: T[]): Promise<T[]>

  /*
  * query the collection to find a set of items
  * */
  find (query: object, limit: number, skip: number): Promise<T[]>

  /*
  * finds a set of items by ids
  * */
  findByIds (ids: string[]): Promise<T[]>

  /*
  * updates a list of items in a collection
  * */
  update (items: T[]): Promise<boolean>

  /*
  * removes a set of items from collection
  * */
  remove (items: T[]): Promise<boolean>

  /*
  * parser a plain object and returns a model
  * */
  parse (data: IStringKeyedObject): T

  /*
  * serializes a model into a plain js object
  * */
  serialize (item: T): object

  /*
  * before-save event
  * an event triggers everytime before a model is saved or updated
  * */
  beforeSave (item: T): Promise<any>

  /*
  * before-save event
  * an event triggers everytime after a model is saved or updated
  * */
  afterSave (item: T): Promise<any>
}
