"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSerializable = (object) => {
    if (!object || typeof object !== "object")
        return false;
    return 'serialize' in object && typeof object.serialize === "function";
};
