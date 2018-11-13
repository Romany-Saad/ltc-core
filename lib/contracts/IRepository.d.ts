import IStringKeyedObject from './IStringKeyedObject';
export default interface IRepository<T> {
    directoryName: string;
    insert(items: T[]): Promise<T[]>;
    find(query: object, limit: number, skip: number): Promise<T[]>;
    count(query: object): Promise<number>;
    findByIds(ids: string[]): Promise<T[]>;
    update(items: T[]): Promise<boolean>;
    remove(items: T[]): Promise<boolean>;
    parse(data: IStringKeyedObject): T;
    serialize(item: T): object;
}
