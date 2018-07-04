"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    static get collectionName() {
        if (!this._collectionName || this._collectionName.trim().length < 1)
            throw new Error('collection name is not set');
        return this._collectionName;
    }
}
exports.default = BaseRepository;
