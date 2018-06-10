"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorBase_1 = require("../ValidatorBase");
class ArrayItemsValidator {
    string() {
    }
}
exports.ArrayItemsValidator = ArrayItemsValidator;
class ArrayValidator extends ValidatorBase_1.ValidatorBase {
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
    items() {
    }
    nth(index) {
    }
    get type() {
        return "array";
    }
}
exports.default = ArrayValidator;
