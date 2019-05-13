"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createLogger, transports, format } = require('winston');
const { printf } = format;
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
exports.winstonErrorHandler = (err, req, res, next) => {
    exports.logger.log({
        level: 'info',
        message: err.message,
        error: err,
    });
};
