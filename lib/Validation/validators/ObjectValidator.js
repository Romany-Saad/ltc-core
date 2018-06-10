"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringValidator_1 = require("./StringValidator");
const ValidatorBase_1 = require("../ValidatorBase");
const NumberValidator_1 = require("./NumberValidator");
class ObjectValidator extends ValidatorBase_1.ValidatorBase {
    constructor(path = "", parent = null) {
        super(path, parent);
    }
    string(name) {
        return new StringValidator_1.default(`${this.path}/${name}`, this);
    }
    number(name) {
        return new NumberValidator_1.default(`${this.path}/${name}`, this);
    }
    get type() {
        return "object";
    }
}
exports.default = ObjectValidator;
