"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseRepository = /** @class */ (function () {
    function BaseRepository() {
    }
    Object.defineProperty(BaseRepository.prototype, "directoryName", {
        get: function () {
            if (!this._directoryName || this._directoryName.trim().length < 1)
                throw new Error('directory name is not set or empty');
            return this._directoryName;
        },
        enumerable: true,
        configurable: true
    });
    return BaseRepository;
}());
exports.default = BaseRepository;
