import { IStringKeyedObject } from './contracts'
import IModel from './contracts/IModel'

export function timeStamped<T extends { new (...args: any[]): IModel }> (constructor: T) {
  return class extends constructor {

    constructor (...args: any[]) {
      super()
      this.__computedFields.push(getPropertySerializer(propertyKey, serializer))
    }
  }
}


export function computedSerialization<T extends { new (...args: any[]): IModel }> (constructor: T) {
  return class extends constructor {
    serialize (): IStringKeyedObject {
      const superResult = super.serialize()
      const computedProps: IStringKeyedObject = {}
      // @ts-ignore
      this.constructor.__computedFields.forEach((serializer: any) => {
        computedProps[ serializer.propertyName ] = serializer.serialize.apply(this)
      })

      return {
        ...superResult,
        ...computedProps,
      }
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


function checkTypeForProperty (target: any, property: string) {
  return collect(target.constructor).includes(property)
}

const getPropertySerializer = (propertyKey: string, serializer: Function) => {
  return {
    propertyName: propertyKey,
    serialize: function () {
      return serializer(this[ propertyKey ])
    },
  }
}

const defaultSerializer = (value: any) => value

export function serializable (serializer = defaultSerializer) {
  return function (target: any, propertyKey: string) {
    if (!checkTypeForProperty(target, '__computedFields')) target.constructor.__computedFields = []
    target.constructor.__computedFields.push(getPropertySerializer(propertyKey, serializer))
  }
}
