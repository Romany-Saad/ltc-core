import Ajv = require("ajv");
import { ValidateFunction } from "ajv";
export declare class YamlSchemaLoader {
    ajv: Ajv.Ajv;
    private attempted;
    private loaded;
    constructor(options?: object);
    loadSchema(filePath: string): string;
    addSchema(rawSchema: object): boolean;
    getSchema(id: string): ValidateFunction;
}
declare const yamlSchemaLoader: YamlSchemaLoader;
export default yamlSchemaLoader;
