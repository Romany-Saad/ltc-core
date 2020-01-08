const Express = require('express')
const cors = require('cors')

const express = Express()

express.use(cors({
  maxAge: 86400
}))
express.disable('x-powered-by')

export default express
