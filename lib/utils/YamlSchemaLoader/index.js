"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const Ajv = require("ajv");
const fs = require("fs");
class YamlSchemaLoader {
    constructor(options = {}) {
        this.attempted = [];
        this.loaded = {};
        this.ajv = new Ajv(options);
        this.ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
    }
    addPlugin(pluginFunction, options) {
        this.ajv = pluginFunction(this.ajv, options);
    }
    loadSchema(filePath) {
        if (this.attempted.indexOf(filePath) >= 0)
            return this.loaded[filePath];
        // adding file to attempted to load array
        this.attempted.push(filePath);
        // loading schema from file system
        const rawSchema = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
        if (!rawSchema.hasOwnProperty("$id"))
            throw new Error(`schema file: ${filePath} doesn't have $id property`);
        // adding schema to pool
        if (!this.addSchema(rawSchema))
            throw new Error(`invalid schema provided file: ${filePath}`);
        // add file to loaded array
        this.loaded[filePath] = rawSchema["$id"];
        return this.loaded[filePath];
    }
    addSchema(rawSchema) {
        // validating schema before loading it into ajv
        if (this.ajv.validateSchema(rawSchema)) {
            this.ajv.addSchema(rawSchema);
            return true;
        }
        return false;
    }
    getSchema(id) {
        return this.ajv.getSchema(id);
    }
}
exports.YamlSchemaLoader = YamlSchemaLoader;
const yamlSchemaLoader = new YamlSchemaLoader();
exports.default = yamlSchemaLoader;
