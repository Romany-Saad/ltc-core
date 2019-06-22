"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
function timeStamped(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.__computedFields.push(getPropertySerializer(propertyKey, serializer));
            return _this;
        }
        return class_1;
    }(constructor));
}
exports.timeStamped = timeStamped;
function computedSerialization(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_2.prototype.serialize = function () {
            var _this = this;
            var superResult = _super.prototype.serialize.call(this);
            var computedProps = {};
            // @ts-ignore
            this.constructor.__computedFields.forEach(function (serializer) {
                computedProps[serializer.propertyName] = serializer.serialize.apply(_this);
            });
            return __assign({}, superResult, computedProps);
        };
        return class_2;
    }(constructor));
}
exports.computedSerialization = computedSerialization;
exports.collect = function (x) {
    var statics = [];
    var proto = Object.getPrototypeOf(x.prototype);
    // first try to collect any parent statics
    if (proto)
        exports.collect(proto.constructor);
    // then collect the current statics
    for (var prop in x)
        statics.push(prop);
    return statics;
};
function checkTypeForProperty(target, property) {
    return exports.collect(target.constructor).includes(property);
}
var getPropertySerializer = function (propertyKey, serializer) {
    return {
        propertyName: propertyKey,
        serialize: function () {
            return serializer(this[propertyKey]);
        },
    };
};
var defaultSerializer = function (value) { return value; };
function serializable(serializer) {
    if (serializer === void 0) { serializer = defaultSerializer; }
    return function (target, propertyKey) {
        if (!checkTypeForProperty(target, '__computedFields'))
            target.constructor.__computedFields = [];
        target.constructor.__computedFields.push(getPropertySerializer(propertyKey, serializer));
    };
}
exports.serializable = serializable;
