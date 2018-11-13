"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    get directoryName() {
        if (!this._directoryName || this._directoryName.trim().length < 1)
            throw new Error('directory name is not set or empty');
        return this._directoryName;
    }
}
exports.default = BaseRepository;
