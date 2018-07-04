import IRepository from "../contracts/IRepository"
import IStringKeyedObject from "../contracts/IStringKeyedObject"

export default abstract class BaseRepository<T> implements IRepository<T> {
  protected static _collectionName: string

  public static get collectionName (): string {
    if (!this._collectionName || this._collectionName.trim().length < 1)
      throw new Error('collection name is not set')
    return this._collectionName
  }

  abstract find (query: object, limit: number, skip: number): Promise<T[]>

  abstract findByIds (ids: string[]): Promise<T[]>

  abstract insert (items: T[]): Promise<T[]>

  abstract parse (data: IStringKeyedObject): T

  abstract remove (items: T[]): Promise<boolean>

  abstract serialize (item: T): object

  abstract update (items: T[]): Promise<boolean>
}
