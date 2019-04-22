const { createLogger, transports, format } = require('winston')
const { printf } = format


// Enable exception handling when you create your logger.
export const logger = createLogger({
  transports: [
    new transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' }),
  ],
})

export const winstonErrorHandler = (err: any, req: any, res: any, next: any) => {
  logger.log({
    level: 'info',
    message: err.message,
    error: err,
    date: (new Date()).toISOString(),
  })
}