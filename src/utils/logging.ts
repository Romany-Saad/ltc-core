const winston = require('winston')
const { createLogger, transports, format } = require('winston')
const { printf } = format

// Enable exception handling when you create your logger.
const errorStackTracerFormat = winston.format((info: any) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message
    })
  }
  return info
})

export const logger = createLogger({
  format: format.combine(
    winston.format.splat(),
    errorStackTracerFormat(),
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' }),
  ],
})

export const winstonErrorHandler = (err: any, req: any, res: any, next: any) => {
  const entry: any = {
    level: 'info',
    message: err.message,
    error: err,
  }
  if (err instanceof Error) {
    entry.stack = err.stack
  }
  logger.error(entry)
}