import BaseModel from '../abstractions/BaseModel';
import BaseRepository from '../abstractions/BaseRepository';
import { IStringKeyedObject } from '../contracts';
export declare class TimeStampedModel extends BaseModel {
    parse(data: any): TimeStampedModel;
    getSchema(): import("c2v/lib/typeValidators").ObjectValidator;
}
export declare class SoftDeletingRepository extends BaseRepository<TimeStampedModel> {
    count(query: object): Promise<number>;
    find(query: object, limit: number, skip: number): Promise<TimeStampedModel[]>;
    findByIds(ids: string[]): Promise<TimeStampedModel[]>;
    insert(items: TimeStampedModel[]): Promise<TimeStampedModel[]>;
    parse(data: IStringKeyedObject): TimeStampedModel;
    remove(items: TimeStampedModel[]): Promise<boolean>;
    serialize(item: TimeStampedModel): object;
    update(items: TimeStampedModel[]): Promise<boolean>;
}
