"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
class ValidatorBase {
    constructor(path = "", parent = null) {
        this.validators = {};
        this.path = path;
        this.parent = parent;
    }
    addValidator(name, validator, params) {
        this.validators[name] = {
            validate: validator,
            params
        };
    }
    validate(value) {
        const result = { success: true, messages: [], errors: [] };
        const validated = json_pointer_1.get(value, this.path);
        // loops over validators and build the validation result
        Object.keys(this.validators).forEach(rule => {
            const validator = this.validators[rule];
            if (!validator.validate(validated, value)) {
                result.success = false;
                result.errors.push({ rule: `${this.type}.${rule}`, dataPath: this.path, params: validator.params });
            }
        });
        return result;
    }
    // returns parent object
    get _() {
        return this.parent;
    }
}
exports.ValidatorBase = ValidatorBase;
