"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const utils_1 = require("../utils");
class BaseModel {
    constructor(data = undefined) {
        this.data = {};
        this.id = undefined;
        this.removeAdditional = true;
        this.idSchema = {
            "type": "string",
        };
        this.set(data);
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getIdFieldName() {
        return "_id";
    }
    serialize() {
        const serialized = {};
        serialized[this.getIdFieldName()] = this.getId();
        Object.keys(this.data).forEach((key) => {
            const value = this.data[key];
            serialized[key] = typeof value === "object" && utils_1.isSerializable(value) ? value.serialize() : value;
        });
        return Object.assign({}, serialized);
    }
    set(data) {
        if (data && data[this.getIdFieldName()]) {
            this.setId(data[this.getIdFieldName()]);
            delete data[this.getIdFieldName()];
        }
        this.data = Object.assign({}, this.data, data);
    }
    selfValidate() {
        if (!this.validateFunction) {
            this.validateFunction =
                Ajv({ removeAdditional: this.removeAdditional })
                    .compile(this.getSchema());
        }
        return this.validateFunction(this.serialize());
    }
    getErrors() {
        return this.validateFunction.errors;
    }
    getSchema() {
        if (!this.schema.hasOwnProperty("properties")) {
            throw new Error("schema doesn't have properties field defined");
        }
        const tempSchema = Object.assign({}, this.schema);
        tempSchema.properties[this.getIdFieldName()] = this.idSchema;
        return tempSchema;
    }
}
exports.default = BaseModel;
