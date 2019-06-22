import BaseModel from './abstractions/BaseModel'
import { computedSerialization, serializable } from './decorators'

@computedSerialization
class x extends BaseModel {

  @serializable(value => value || new Date())
  get createdAt (): Date {
    return this.get('createdAt')
  }

  @serializable(value => value.toString())
  updatedAt = new Date()
}

const y = new x()
console.log(y.serialize())

