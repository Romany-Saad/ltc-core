const Express = require('express')
const cors = require('cors')

const express = Express()

express.use(cors())
express.disable('x-powered-by')

export default express
