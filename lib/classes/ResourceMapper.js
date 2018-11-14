"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceMapper {
    constructor() {
        this.resourcesInfo = [];
    }
    addResourceInfo(resourceInfo) {
        if (this.resourcesInfo.findIndex(ri => ri.resourceName === resourceInfo.resourceName) >= 0)
            throw new Error(`resource with the name ${resourceInfo.resourceName.toString()} already exists`);
        this.resourcesInfo.push(resourceInfo);
    }
    mapResourceByName(name) {
        return this.resourcesInfo.find(ri => ri.resourceName === name);
    }
    mapResourceByDirectoryName(name) {
        return this.resourcesInfo.find(ri => ri.repository.directoryName === name);
    }
}
exports.default = ResourceMapper;
