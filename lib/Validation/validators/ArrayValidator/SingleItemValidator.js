"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
const StringValidator_1 = require("../StringValidator");
const NumberValidator_1 = require("../NumberValidator");
const utils_1 = require("../../utils");
class SingleItemValidator {
    constructor(index, parent) {
        this.index = index;
        this.parent = parent;
    }
    get string() {
        const tv = new StringValidator_1.default(this.parent);
        this.typeValidator = tv;
        return tv;
    }
    get number() {
        const nv = new NumberValidator_1.default(this.parent);
        this.typeValidator = nv;
        return nv;
    }
    validate(value, path) {
        let result = { success: true, messages: [], errors: [] };
        const dataPath = `${path}/${this.index}`;
        if (!json_pointer_1.has(value, path) || !json_pointer_1.has(value, dataPath))
            return result;
        const itemResult = this.typeValidator.validate(value, dataPath);
        result = utils_1.combineValidationResults(result, itemResult);
        return result;
    }
}
exports.default = SingleItemValidator;
