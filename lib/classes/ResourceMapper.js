"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceMapper {
    constructor() {
        this.resources = [];
    }
    addResourceInfo(resourceInfo) {
        if (this.resources.findIndex(ri => ri.resourceName === resourceInfo.resourceName) >= 0)
            throw new Error(`resource with the name ${resourceInfo.resourceName} already exists`);
        this.resources.push(resourceInfo);
    }
    mapResourceByName(name) {
        return this.resources.find(ri => ri.resourceName === name);
    }
    mapResourceByDirectoryName(name) {
        return this.resources.find(ri => ri.repository.directoryName === name);
    }
}
exports.default = ResourceMapper;
