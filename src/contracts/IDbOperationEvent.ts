import IModel from './IModel'

export interface IDbOperationEvent {
  operationName: string
  resourceName: string
  affectedItems: Array<IModel>
  meta: any
}
