"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSerializable = function (object) {
    if (!object || typeof object !== "object")
        return false;
    return 'serialize' in object && typeof object.serialize === "function";
};
var namer = /** @class */ (function () {
    function namer() {
    }
    namer.resolve = function (plugin, resource, what) {
        return plugin + "." + resource + "." + what;
    };
    return namer;
}());
exports.namer = namer;
var merge = function () {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var result = {};
    for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
        var item = items_1[_a];
        result = __assign({}, result, item);
    }
    return result;
};
exports.merge = merge;
