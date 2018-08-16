"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const c2v_1 = require("c2v");
const fast_json_patch_1 = require("fast-json-patch");
const lodash_1 = require("lodash");
class BaseModel {
    constructor(data = undefined) {
        this.id = undefined;
        this.data = {};
        this.schema = undefined;
        this.state = undefined;
        this.dbState = {};
        this.set(lodash_1.cloneDeep(data));
    }
    getDbState() {
        return lodash_1.cloneDeep(this.dbState);
    }
    updateDbState() {
        this.dbState = this.serialize();
    }
    serialize() {
        const serialized = {};
        serialized[this.getIdFieldName()] = this.getId();
        Object.keys(this.data).forEach((key) => {
            const value = this.data[key];
            serialized[key] = typeof value === "object" && utils_1.isSerializable(value) ? value.serialize() : value;
        });
        return lodash_1.cloneDeep(serialized);
    }
    set(data) {
        if (data && data[this.getIdFieldName()]) {
            this.setId(data[this.getIdFieldName()]);
            delete data[this.getIdFieldName()];
        }
        this.data = lodash_1.merge({}, this.data, data);
    }
    get(key) {
        if (key === this.getIdFieldName())
            return this.getId();
        return this.data[key];
    }
    getIdFieldName() {
        return "_id";
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getUpdatePatch() {
        const initState = this.dbState;
        const currentState = this.serialize();
        delete initState[this.getIdFieldName()];
        delete currentState[this.getIdFieldName()];
        return fast_json_patch_1.compare(initState, currentState);
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
