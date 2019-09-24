"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston');
const { createLogger, transports, format } = require('winston');
const { printf } = format;
// Enable exception handling when you create your logger.
const errorStackTracerFormat = winston.format((info) => {
    if (info instanceof Error) {
        return Object.assign({}, info, {
            stack: info.stack,
            message: info.message
        });
    }
    return info;
});
exports.logger = createLogger({
    format: format.combine(winston.format.splat(), errorStackTracerFormat(), format.timestamp(), format.json()),
    transports: [
        new transports.File({ filename: 'combined.log' }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' }),
    ],
});
exports.winstonErrorHandler = (err, req, res, next) => {
    const entry = {
        level: 'info',
        message: err.message,
        error: err,
    };
    if (err instanceof Error) {
        entry.stack = err.stack;
    }
    exports.logger.error(entry);
};
