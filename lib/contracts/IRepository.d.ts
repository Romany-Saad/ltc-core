import IStringKeyedObject from "./IStringKeyedObject";
export default interface IRepository<T> {
    insert(items: T[]): Promise<T[]>;
    find(query: object, limit: number, skip: number): Promise<T[]>;
    findByIds(ids: string[]): Promise<T[]>;
    update(items: T[]): Promise<boolean>;
    remove(items: T[]): Promise<boolean>;
    parse(data: IStringKeyedObject): T;
    serialize(item: T): object;
}
