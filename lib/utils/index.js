"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YamlSchemaLoader_1 = require("./YamlSchemaLoader");
exports.yamlSchemaLoader = YamlSchemaLoader_1.default;
exports.isSerializable = (object) => {
    if (!object || typeof object !== "object")
        return false;
    return 'serialize' in object && typeof object.serialize === "function";
};
class namer {
    static resolve(plugin, resource, what) {
        return `${plugin}.${resource}.${what}`;
    }
}
exports.namer = namer;
