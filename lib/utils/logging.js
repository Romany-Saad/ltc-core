"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('winston'), createLogger = _a.createLogger, transports = _a.transports, format = _a.format;
var printf = format.printf;
// Enable exception handling when you create your logger.
exports.logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({ filename: 'combined.log' }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' }),
    ],
});
exports.winstonErrorHandler = function (err, req, res, next) {
    exports.logger.log({
        level: 'info',
        message: err.message,
        error: err,
    });
};
