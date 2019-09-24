const app = require('./app').app
const winstonMiddleware = require('./../../lib/utils/logging').winstonErrorHandler

app.express.use(winstonMiddleware)
app.express.get('/test', (req, res, next) => {
  next('this is an error')
})
app.start()