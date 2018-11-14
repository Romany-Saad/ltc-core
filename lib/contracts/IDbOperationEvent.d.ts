import IModel from './IModel';
export default interface IDbOperationEvent {
    operationName: string;
    resourceName: string;
    affectedItems: Array<IModel>;
    meta?: any;
}
