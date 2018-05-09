import { ISerializable } from "../contracts/index";
import yamlSchemaLoader from "./YamlSchemaLoader";
export declare const isSerializable: (object: any) => object is ISerializable;
export { yamlSchemaLoader };
