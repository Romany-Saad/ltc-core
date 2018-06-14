"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("json-pointer");
class ValidatorBase {
    constructor(parent = null) {
        this.validators = {};
        this.parent = parent;
    }
    addValidator(name, validator, params) {
        const pointer = `/${name}`;
        if (json_pointer_1.has(this.validators, pointer))
            throw new Error(`validator with the same name ${name} already exists`);
        json_pointer_1.set(this.validators, pointer, {
            validate: validator,
            params
        });
    }
    validate(value, path = "") {
        return this.selfValidate(value, path);
    }
    selfValidate(value, path = "") {
        const result = { success: true, messages: [], errors: [] };
        const validated = json_pointer_1.get(value, path);
        // loops over validators and build the validation result
        Object.keys(this.validators).forEach(rule => {
            const validator = this.validators[rule];
            if (!validator.validate(validated, value, path)) {
                result.success = false;
                result.errors.push({ rule: `${this.type}.${rule}`, dataPath: path, params: validator.params });
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
