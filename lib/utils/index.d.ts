import { ISerializable } from "../contracts/index";
import yamlSchemaLoader from "./YamlSchemaLoader";
export declare const isSerializable: (object: any) => object is ISerializable;
declare class namer {
    static resolve(plugin: string, resource: string, what: string): string;
}
export { yamlSchemaLoader, namer };
