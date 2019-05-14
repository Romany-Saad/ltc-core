"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require('express');
const cors = require('cors');
const express = Express();
express.use(cors());
express.disable('x-powered-by');
exports.default = express;
