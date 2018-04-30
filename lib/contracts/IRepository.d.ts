export default interface IRepository<T> {
    insert(items: T[]): Promise<T[]>;
    find(query: object): Promise<T[]>;
    findByIds(ids: string[]): Promise<T[]>;
    update(items: T[]): Promise<boolean>;
    remove(items: T[]): Promise<boolean>;
    parse(data: object): T;
    serialize(item: T): object;
}
