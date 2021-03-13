import c2v from 'c2v'
import BaseModel from '../abstractions/BaseModel'
import { computedSerialization, SoftDeletes, timestamp } from '../decorators'
import BaseRepository from '../abstractions/BaseRepository'
import { IStringKeyedObject } from '../contracts'

@computedSerialization
@timestamp
export class TimeStampedModel extends BaseModel {

  parse (data: any) {
    return new TimeStampedModel(data)
  }

  getSchema () {
    return c2v.obj.requires("username", "foo").keys({
      username: c2v.str.minLength(3),
      foo: c2v.obj.requires("address", "name").keys({
        address: c2v.str.email().maxLength(128),
        name: c2v.str.maxLength(128),
      }),
    })
  }
}

@SoftDeletes
export class SoftDeletingRepository extends BaseRepository<TimeStampedModel> {

  count (query: object): Promise<number> {
    return undefined
  }

  find (query: object, limit: number, skip: number): Promise<TimeStampedModel[]> {
    return undefined
  }

  findByIds (ids: string[]): Promise<TimeStampedModel[]> {
    return undefined
  }

  insert (items: TimeStampedModel[]): Promise<TimeStampedModel[]> {
    return undefined
  }

  parse (data: IStringKeyedObject): TimeStampedModel {
    return undefined
  }

  remove (items: TimeStampedModel[]): Promise<boolean> {
    return undefined
  }

  serialize (item: TimeStampedModel): object {
    return undefined
  }

  update (items: TimeStampedModel[]): Promise<boolean> {
    return undefined
  }

}

