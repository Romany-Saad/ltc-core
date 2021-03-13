"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var c2v_1 = require("c2v");
var lodash_1 = require("lodash");
var index_1 = require("../index");
var ooPatch = require('json8-patch');
var BaseModel = /** @class */ (function () {
    function BaseModel(data) {
        if (data === void 0) { data = undefined; }
        this.__computedFields = [];
        this.id = undefined;
        this.data = {};
        this.schema = undefined;
        this.dbState = {};
        this.set(lodash_1.cloneDeep(data));
    }
    BaseModel.prototype.getDbState = function () {
        return lodash_1.cloneDeep(this.dbState);
    };
    BaseModel.prototype.updateDbState = function () {
        this.dbState = this.serialize();
    };
    BaseModel.prototype.serialize = function () {
        var _this = this;
        var serialized = {};
        serialized[this.getIdFieldName()] = this.getId();
        Object.keys(this.data).forEach(function (key) {
            var value = _this.data[key];
            serialized[key] = typeof value === 'object' && utils_1.isSerializable(value) ? value.serialize() : value;
        });
        return lodash_1.cloneDeep(serialized);
    };
    BaseModel.prototype.set = function (data) {
        if (data && data[this.getIdFieldName()]) {
            var id = void 0;
            if (typeof data[this.getIdFieldName()] === 'string') {
                id = data[this.getIdFieldName()];
            }
            else {
                id = data[this.getIdFieldName()].toString();
            }
            this.setId(id);
            delete data[this.getIdFieldName()];
        }
        this.data = utils_1.merge({}, this.data, data);
    };
    BaseModel.prototype.get = function (key) {
        if (key === this.getIdFieldName())
            return this.getId();
        return this.data[key];
    };
    BaseModel.prototype.getIdFieldName = function () {
        return '_id';
    };
    BaseModel.prototype.setId = function (id) {
        this.id = id;
    };
    BaseModel.prototype.getId = function () {
        return this.id;
    };
    BaseModel.prototype.getUpdatePatch = function () {
        var initState = this.dbState;
        var currentState = this.serialize();
        delete initState[this.getIdFieldName()];
        delete currentState[this.getIdFieldName()];
        var patch = ooPatch.diff(initState, currentState);
        var reverse = ooPatch.diff(currentState, initState);
        return {
            patch: patch,
            reversePatch: reverse,
        };
    };
    BaseModel.prototype.selfValidate = function () {
        index_1.emitter.emit(index_1.names.EV_MODEL_VALIDATING, this);
        return c2v_1.Context.validate(this.getSchema(), this.serialize());
    };
    BaseModel.prototype.getSchema = function () {
        return this.schema;
    };
    return BaseModel;
}());
exports.default = BaseModel;
