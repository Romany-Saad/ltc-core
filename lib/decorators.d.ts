import { IStringKeyedObject } from './contracts';
import IModel from './contracts/IModel';
export declare function timeStamped<T extends {
    new (...args: any[]): IModel;
}>(constructor: T): {
    new (...args: any[]): {
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
    new (...args: any[]): IModel;
}>(constructor: T): {
    new (...args: any[]): {
        serialize(): IStringKeyedObject;
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
export declare let collect: (x: any) => string[];
export declare function serializable(serializer?: (value: any) => any): (target: any, propertyKey: string) => void;
