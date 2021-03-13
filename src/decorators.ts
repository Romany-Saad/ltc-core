import { IRepository, IStringKeyedObject } from './contracts'
import IModel from './contracts/IModel'

const getPropertySerializer = (propertyKey: string, serializer: Function): IPropertySerializer => {
  return {
    propertyName: propertyKey,
    serialize: function () {
      return serializer(this[ propertyKey ])
    },
  }
}

export interface IPropertySerializer {
  propertyName: string,
  serialize: Function
}

export interface IComputeProperties extends IModel {
  __computedFields: IPropertySerializer[]
}

export function timestamp<T extends { new (...args: any[]): IComputeProperties }> (constructor: T) {
  return class extends constructor {
    constructor (...args: any[]) {
      super(args)
      this.__computedFields.push(getPropertySerializer('createdAt', (value: any) => value || new Date()))
      this.__computedFields.push(getPropertySerializer('updatedAt', (value: any) => value || new Date()))
    }
  }
}


export function computedSerialization<T extends { new (...args: any[]): IComputeProperties }> (constructor: T) {
  return class extends constructor {

    serialize (): IStringKeyedObject {
      const superResult = super.serialize()
      const computedProps: IStringKeyedObject = {}

      // @ts-ignore
      this.__computedFields.forEach((serializer: any) => {
        computedProps[ serializer.propertyName ] = serializer.serialize.apply(this)
      })

      return {
        ...superResult,
        ...computedProps,
      }
    }

  }
}

export function SoftDeletes<T extends { new (...args: any[]): IRepository<IModel> }> (constructor: T) {
  return class extends constructor {
    public readonly hasSoftDeletes = true

    remove (items: IModel[]): Promise<boolean> {
      items.forEach(item => item.set({ 'deletedAt': new Date() }))

      // change the operation to update cuz we will not
      // actually remove the items from the DB
      return this.update(items)
    }

    /*
    * query the collection to find a set of items
    * */
    find (query: any, limit: number, skip: number, sort: object): Promise<IModel[]> {
      if (!query.hasOwnProperty('deletedAt')) {
        query.deletedAt = null
      }

      return super.find(query, limit, skip, sort)
    }

    restore (items: IModel[]): Promise<boolean> {
      items.forEach(item => item.set({ 'deletedAt': null }))

      // change the operation to update cuz we will not
      // actually remove the items from the DB
      return this.update(items)
    }

  }
}


export let collect = (x: any) => {
  let statics: string[] = []
  let proto = Object.getPrototypeOf(x.prototype)
  // first try to collect any parent statics
  if (proto)
    collect(proto.constructor)
  // then collect the current statics
  for (let prop in x) statics.push(prop)
  return statics
}


const defaultSerializer = (value: any) => value

export function serializable (serializer = defaultSerializer) {
  return function (target: any, propertyKey: string) {
    console.log(target)
    if (!collect(target.constructor).includes('__computedFields')) target.constructor.__computedFields = []
    target.constructor.__computedFields.push(getPropertySerializer(propertyKey, serializer))
  }
}
