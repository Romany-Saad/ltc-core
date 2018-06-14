"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorBase_1 = require("../../ValidatorBase");
const AllItemsValidator_1 = require("./AllItemsValidator");
const json_pointer_1 = require("json-pointer");
const utils_1 = require("../../utils");
const SingleItemValidator_1 = require("./SingleItemValidator");
class ArrayValidator extends ValidatorBase_1.ValidatorBase {
    constructor(path = "", parent = null) {
        super(parent);
        this.singleItemValidators = [];
        this.allItemsValidator = new AllItemsValidator_1.default(this);
    }
    minItems(limit) {
        this.addValidator('minItems', (value, obj) => {
            return value.length >= limit;
        }, { limit });
        return this;
    }
    maxItems(limit) {
        this.addValidator('maxItems', (value, obj) => {
            return value.length <= limit;
        }, { limit });
        return this;
    }
    allItems() {
        return this.allItemsValidator;
    }
    nth(index) {
        const siv = new SingleItemValidator_1.default(index, this);
        this.singleItemValidators.push(siv);
        return siv;
    }
    get type() {
        return "array";
    }
    validate(value, path = "") {
        const selfResult = this.selfValidate(value, path);
        let allItemsResult = { success: true, messages: [], errors: [] };
        if (json_pointer_1.has(value, path)) {
            // validating each entry
            allItemsResult = utils_1.combineValidationResults(this.allItemsValidator.validate(value, path), allItemsResult);
        }
        let result = utils_1.combineValidationResults(selfResult, allItemsResult);
        this.singleItemValidators.forEach(validator => {
            result = utils_1.combineValidationResults(result, validator.validate(value, path));
        });
        return result;
    }
}
exports.default = ArrayValidator;
