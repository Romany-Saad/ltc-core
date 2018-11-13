import IStringKeyedObject from './IStringKeyedObject'

export default interface IRepository<T> {

  directoryName : string

  /*
  * inserts a set of items into collection
  * */
  insert (items: T[]): Promise<T[]>

  /*
  * query the collection to find a set of items
  * */
  find (query: object, limit: number, skip: number): Promise<T[]>

  /*
  * counts all items matching a certain criteria
  * */
  count (query: object): Promise<number>

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
}
