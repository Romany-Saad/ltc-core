"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringValidator_1 = require("./StringValidator");
const ValidatorBase_1 = require("../ValidatorBase");
const NumberValidator_1 = require("./NumberValidator");
const json_pointer_1 = require("json-pointer");
const utils_1 = require("../utils");
const ArrayValidator_1 = require("./ArrayValidator");
const getPath = (name) => (name.charAt(0) === "/") ? name : "/" + name;
class ObjectValidator extends ValidatorBase_1.ValidatorBase {
    // todo add types: number(float /integer) , string, boolean, array, object
    constructor(path = "", parent = null) {
        super(parent);
        this.requiredProps = [];
        this.typeValidators = {};
        this.path = path;
    }
    get type() {
        return "object";
    }
    required(...properties) {
        this.requiredProps = properties;
        return this;
    }
    addTypeValidator(name, validator) {
        const pointer = `/${name}`;
        if (json_pointer_1.has(this.typeValidators, pointer))
            return json_pointer_1.get(this.typeValidators, pointer);
        json_pointer_1.set(this.typeValidators, pointer, validator);
        return validator;
    }
    array(name) {
        return this.addTypeValidator(name, new ArrayValidator_1.default(getPath(name), this));
    }
    object(name) {
        return this.addTypeValidator(name, new ObjectValidator(getPath(name), this));
    }
    string(name) {
        return this.addTypeValidator(name, new StringValidator_1.default(this));
    }
    number(name) {
        return this.addTypeValidator(name, new NumberValidator_1.default(this));
    }
    // add validation rule requires
    validate(value, path = "") {
        let result = { success: true, messages: [], errors: [] };
        // checking required properties
        this.requiredProps.forEach(property => {
            if (!json_pointer_1.has(value, `${path}/${property}`)) {
                result.success = false;
                result.errors.push({ params: { property }, dataPath: path, rule: "object.required" });
            }
        });
        if (json_pointer_1.has(value, path)) {
            const target = json_pointer_1.get(value, path);
            // loops over validators and build the validation result
            Object.keys(this.validators).forEach(rule => {
                const validator = this.validators[rule];
                if (!validator.validate(target, value, path)) {
                    result.success = false;
                    result.errors.push({
                        rule: `${this.type}.${rule}`,
                        dataPath: path,
                        params: validator.params
                    });
                }
            });
        }
        Object.keys(this.typeValidators).forEach(propertyName => {
            const path = [this.path, propertyName].join("/");
            const propertyResult = this.typeValidators[propertyName]
                .validate(value, path);
            result = utils_1.combineValidationResults(result, propertyResult);
        });
        return result;
    }
}
exports.default = ObjectValidator;
