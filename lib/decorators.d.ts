import { IRepository, IStringKeyedObject } from './contracts';
import IModel from './contracts/IModel';
export interface IPropertySerializer {
    propertyName: string;
    serialize: Function;
}
export interface IComputeProperties extends IModel {
    __computedFields: IPropertySerializer[];
}
export declare function timestamp<T extends {
    new (...args: any[]): IComputeProperties;
}>(constructor: T): {
    new (...args: any[]): {
        __computedFields: IPropertySerializer[];
        getDbState(): object;
        getIdFieldName(): string;
        set(data: IStringKeyedObject): void;
        get(key: string): any;
        updateDbState(): void;
        getUpdatePatch(): object;
        setId(id: string): void;
        getId(): string;
        getSchema(): import("c2v/lib/contracts").ITypeValidator;
        selfValidate(): Promise<import("c2v/lib/contracts").IValidationResult>;
        serialize(): IStringKeyedObject;
    };
} & T;
export declare function computedSerialization<T extends {
    new (...args: any[]): IComputeProperties;
}>(constructor: T): {
    new (...args: any[]): {
        serialize(): IStringKeyedObject;
        __computedFields: IPropertySerializer[];
        getDbState(): object;
        getIdFieldName(): string;
        set(data: IStringKeyedObject): void;
        get(key: string): any;
        updateDbState(): void;
        getUpdatePatch(): object;
        setId(id: string): void;
        getId(): string;
        getSchema(): import("c2v/lib/contracts").ITypeValidator;
        selfValidate(): Promise<import("c2v/lib/contracts").IValidationResult>;
    };
} & T;
export declare function SoftDeletes<T extends {
    new (...args: any[]): IRepository<IModel>;
}>(constructor: T): {
    new (...args: any[]): {
        readonly hasSoftDeletes: true;
        remove(items: IModel[]): Promise<boolean>;
        find(query: any, limit: number, skip: number, sort: object): Promise<IModel[]>;
        restore(items: IModel[]): Promise<boolean>;
        directoryName: string;
        insert(items: IModel[]): Promise<IModel[]>;
        count(query: object): Promise<number>;
        findByIds(ids: string[]): Promise<IModel[]>;
        update(items: IModel[]): Promise<boolean>;
        parse(data: IStringKeyedObject): IModel;
        serialize(item: IModel): object;
    };
} & T;
export declare let collect: (x: any) => string[];
export declare function serializable(serializer?: (value: any) => any): (target: any, propertyKey: string) => void;
