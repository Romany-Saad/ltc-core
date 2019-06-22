"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceMapper = /** @class */ (function () {
    function ResourceMapper() {
        this.resources = [];
    }
    ResourceMapper.prototype.addResourceInfo = function (resourceInfo) {
        if (this.resources.findIndex(function (ri) { return ri.resourceName === resourceInfo.resourceName; }) >= 0)
            throw new Error("resource with the name " + resourceInfo.resourceName + " already exists");
        this.resources.push(resourceInfo);
    };
    ResourceMapper.prototype.mapResourceByName = function (name) {
        return this.resources.find(function (ri) { return ri.resourceName === name; });
    };
    ResourceMapper.prototype.mapResourceByDirectoryName = function (name) {
        return this.resources.find(function (ri) { return ri.repository.directoryName === name; });
    };
    return ResourceMapper;
}());
exports.default = ResourceMapper;
