import IModel from './IModel';
export default interface IDbOperationData {
    operationType: string | symbol;
    resourceName: string;
    affectedItems: Array<IModel>;
    meta?: any;
}
