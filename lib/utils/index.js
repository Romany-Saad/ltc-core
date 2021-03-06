"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const merge = (...items) => {
    let result = {};
    for (let item of items) {
        result = Object.assign(Object.assign({}, result), item);
    }
    return result;
};
exports.merge = merge;
