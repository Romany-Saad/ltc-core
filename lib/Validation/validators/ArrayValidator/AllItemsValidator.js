"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
const StringValidator_1 = require("../StringValidator");
const NumberValidator_1 = require("../NumberValidator");
const utils_1 = require("../../utils");
class AllItemsValidator {
    constructor(parent) {
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
        if (!json_pointer_1.has(value, path))
            return result;
        const array = json_pointer_1.get(value, path);
        if (this.typeValidator) {
            array.forEach((item, index) => {
                const itemResult = this.typeValidator.validate(value, `${path}/${index}`);
                result = utils_1.combineValidationResults(result, itemResult);
            });
        }
        return result;
    }
}
exports.default = AllItemsValidator;
