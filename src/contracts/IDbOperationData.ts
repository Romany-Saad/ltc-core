import IModel from './IModel'

export default interface IDbOperationData {
  operationType: symbol
  resourceName: string
  affectedItems: Array<IModel>
  meta?: any
}
