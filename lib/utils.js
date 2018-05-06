"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSerializable = (object) => {
    return 'serialize' in object && typeof object.serialize === "function";
};
