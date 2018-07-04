import IRepository from "../contracts/IRepository";
import IStringKeyedObject from "../contracts/IStringKeyedObject";
export default abstract class BaseRepository<T> implements IRepository<T> {
    protected static _collectionName: string;
    static readonly collectionName: string;
    abstract find(query: object, limit: number, skip: number): Promise<T[]>;
    abstract findByIds(ids: string[]): Promise<T[]>;
    abstract insert(items: T[]): Promise<T[]>;
    abstract parse(data: IStringKeyedObject): T;
    abstract remove(items: T[]): Promise<boolean>;
    abstract serialize(item: T): object;
    abstract update(items: T[]): Promise<boolean>;
}
