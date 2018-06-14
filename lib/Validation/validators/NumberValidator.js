"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorBase_1 = require("../ValidatorBase");
class NumberValidator extends ValidatorBase_1.ValidatorBase {
    constructor(parent) {
        super(parent);
        // attaching default validator
        this.addValidator('number', (value, obj, path) => {
            return !isNaN(value);
        }, {});
    }
    integer() {
        this.addValidator('integer', (value, obj, path) => {
            return Number.isInteger(value);
        }, {});
        return this;
    }
    min(min, exclusive = false) {
        this.addValidator('min', (value, obj, path) => {
            return (exclusive) ? value > min : value >= min;
        }, { min });
        return this;
    }
    max(max, exclusive = false) {
        this.addValidator('min', (value, obj) => {
            return (exclusive) ? value < max : value <= max;
        }, { max });
        return this;
    }
    multipleOf(modulus) {
        this.addValidator('multipleOf', (value, obj) => {
            return value % modulus === 0;
        }, { modulus });
        return this;
    }
    get type() {
        return "number";
    }
}
exports.default = NumberValidator;
