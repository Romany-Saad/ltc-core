export default interface IRepository<T> {
    findByIds(ids: string[]): Promise<T[]>;
    find(query: object): Promise<T[]>;
    insert(items: T[]): Promise<T[]>;
    remove(items: T[]): boolean;
    parse(data: object): T;
    serialize(item: T): object;
}
