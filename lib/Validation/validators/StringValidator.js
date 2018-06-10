"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorBase_1 = require("../ValidatorBase");
class StringValidator extends ValidatorBase_1.ValidatorBase {
    minLength(minLength) {
        this.addValidator('minLength', (value, obj) => {
            return value.length >= minLength;
        }, { minLength });
        return this;
    }
    maxLength(maxLength) {
        this.addValidator('maxLength', (value, obj) => {
            return value.length <= maxLength;
        }, { maxLength });
        return this;
    }
    matches(regex) {
        this.addValidator('matches', (value, obj) => {
            return regex.test(value);
        }, { regex });
        return this;
    }
    get type() {
        return "string";
    }
}
exports.default = StringValidator;
