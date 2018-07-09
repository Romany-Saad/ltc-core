import { ISerializable } from "../contracts/index";
export declare const isSerializable: (object: any) => object is ISerializable;
declare class namer {
    static resolve(plugin: string, resource: string, what: string): string;
}
export { namer };
