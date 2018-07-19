"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const c2v_1 = require("c2v");
class BaseModel {
    constructor(data = undefined) {
        this.id = undefined;
        this.data = {};
        this.schema = undefined;
        this.state = undefined;
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
        const validation = c2v_1.Context.validate(this.getSchema(), this.serialize());
        try {
            return validation;
        }
        finally {
            validation.then((result) => {
                this.state = result;
            });
        }
    }
    getResult() {
        return this.state;
    }
    getSchema() {
        return this.schema;
    }
}
exports.default = BaseModel;
