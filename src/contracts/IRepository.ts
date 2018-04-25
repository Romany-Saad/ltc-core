export default interface IRepository<T> {

  /*
  * finds a set of items by ids
  * */
  findByIds (ids: string[]): Promise<T[]>

  /*
  * query the collection to find a set of items
  * */
  find (query: object): Promise<T[]>

  /*
  * inserts a set of items into collection
  * */
  insert (items: T[]): Promise<T[]>

  /*
  * removes a set of items from collection
  * */
  remove (items: T[]): boolean
}
