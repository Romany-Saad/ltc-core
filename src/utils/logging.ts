import { ILog } from '../abstractions/ILog'
import { IErrorLog } from '../abstractions/IErrorLog'
import { IInfoLog } from '../abstractions/IInfoLog'

const winston = require('winston')
const { createLogger, transports, format } = require('winston')
const { printf } = format

const errorStackTracerFormat = winston.format((info: any) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    })
  }
  return info
})

export class Logger {
  private originalInstance: any

  constructor () {
    this.originalInstance = createLogger({
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
  }

  getOriginalLoggerInstance () {
    return this.originalInstance
  }

  info (data: IInfoLog) {
    return this.originalInstance.info(data.message)
  }

  error (data: IErrorLog) {
    return this.originalInstance.error(data.message, data.error)
  }

  log (data: ILog) {
    if (data.level === 'info') {
      this.info(data)
    } else {
      this.error(data)
    }
  }

}

export const logger = new Logger()

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

export const winstonErrorHandler = (err: any, req: any, res: any, next: any) => {
  const entry: any = {
    level: 'error',
    message: err.message,
    error: err,
  }
  if (err instanceof Error) {
    entry.stack = err.stack
  }
  logger.error(entry)
}