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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var c2v_1 = require("c2v");
var BaseModel_1 = require("../abstractions/BaseModel");
var decorators_1 = require("../decorators");
var BaseRepository_1 = require("../abstractions/BaseRepository");
var TimeStampedModel = /** @class */ (function (_super) {
    __extends(TimeStampedModel, _super);
    function TimeStampedModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeStampedModel_1 = TimeStampedModel;
    TimeStampedModel.prototype.parse = function (data) {
        return new TimeStampedModel_1(data);
    };
    TimeStampedModel.prototype.getSchema = function () {
        return c2v_1.default.obj.requires("username", "foo").keys({
            username: c2v_1.default.str.minLength(3),
            foo: c2v_1.default.obj.requires("address", "name").keys({
                address: c2v_1.default.str.email().maxLength(128),
                name: c2v_1.default.str.maxLength(128),
            }),
        });
    };
    var TimeStampedModel_1;
    TimeStampedModel = TimeStampedModel_1 = __decorate([
        decorators_1.computedSerialization,
        decorators_1.timestamp
    ], TimeStampedModel);
    return TimeStampedModel;
}(BaseModel_1.default));
exports.TimeStampedModel = TimeStampedModel;
var SoftDeletingRepository = /** @class */ (function (_super) {
    __extends(SoftDeletingRepository, _super);
    function SoftDeletingRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoftDeletingRepository.prototype.count = function (query) {
        return undefined;
    };
    SoftDeletingRepository.prototype.find = function (query, limit, skip) {
        return undefined;
    };
    SoftDeletingRepository.prototype.findByIds = function (ids) {
        return undefined;
    };
    SoftDeletingRepository.prototype.insert = function (items) {
        return undefined;
    };
    SoftDeletingRepository.prototype.parse = function (data) {
        return undefined;
    };
    SoftDeletingRepository.prototype.remove = function (items) {
        return undefined;
    };
    SoftDeletingRepository.prototype.serialize = function (item) {
        return undefined;
    };
    SoftDeletingRepository.prototype.update = function (items) {
        return undefined;
    };
    SoftDeletingRepository = __decorate([
        decorators_1.SoftDeletes
    ], SoftDeletingRepository);
    return SoftDeletingRepository;
}(BaseRepository_1.default));
exports.SoftDeletingRepository = SoftDeletingRepository;
