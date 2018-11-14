import IModel from './IModel';
export default interface IDbOperationData {
    operationType: string | symbol;
    resourceName: string | symbol;
    affectedItems: Array<IModel>;
    meta?: any;
}
