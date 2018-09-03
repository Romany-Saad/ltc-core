import IModel from "./IModel";

export interface IDbEventData {
    collectionName: string
    items: Array<IModel>
}
