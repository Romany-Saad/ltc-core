"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class BaseModel {
    constructor(data = undefined) {
        this.data = {};
        this.id = undefined;
        this.validateFunction = undefined;
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
    get(key) {
        if (key === this.getIdFieldName())
            return this.getId();
        return this.data[key];
    }
    selfValidate() {
        if (!this.validateFunction) {
            const schema = this.getSchema();
            let id;
            if (typeof schema === "string") {
                id = utils_1.index.loadSchema(schema);
            }
            else if (typeof schema === "object") {
                utils_1.index.addSchema(schema);
                id = schema["$id"];
            }
            if (!id)
                throw new Error("schema not found");
            this.validateFunction = utils_1.index.getSchema(id);
        }
        return this.validateFunction(this.serialize());
    }
    getErrors() {
        return this.validateFunction.errors;
    }
}
exports.default = BaseModel;
