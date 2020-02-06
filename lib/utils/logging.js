"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston');
const { createLogger, transports, format } = require('winston');
const { printf } = format;
const errorStackTracerFormat = winston.format((info) => {
    if (info instanceof Error) {
        return Object.assign({}, info, {
            stack: info.stack,
            message: info.message,
        });
    }
    return info;
});
class Logger {
    constructor() {
        this.originalInstance = createLogger({
            format: format.combine(winston.format.splat(), errorStackTracerFormat(), format.timestamp(), format.json()),
            transports: [
                new transports.File({ filename: 'combined.log' }),
            ],
            exceptionHandlers: [
                new transports.File({ filename: 'exceptions.log' }),
            ],
        });
    }
    getOriginalLoggerInstance() {
        return this.originalInstance;
    }
    info(data) {
        return this.originalInstance.info(data.message);
    }
    error(data) {
        return this.originalInstance.error(data.message, data.error);
    }
    log(data) {
        if (data.level === 'info') {
            this.info(data);
        }
        else {
            this.error(data);
        }
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
// Enable exception handling when you create your logger.
//
// export const logger = createLogger({
//   format: format.combine(
//     winston.format.splat(),
//     errorStackTracerFormat(),
//     format.timestamp(),
//     format.json(),
//   ),
//   transports: [
//     new transports.File({ filename: 'combined.log' }),
//   ],
//   exceptionHandlers: [
//     new transports.File({ filename: 'exceptions.log' }),
//   ],
// })
exports.winstonErrorHandler = (err, req, res, next) => {
    const entry = {
        level: 'error',
        message: err.message,
        error: err,
    };
    if (err instanceof Error) {
        entry.stack = err.stack;
    }
    exports.logger.error(entry);
};
