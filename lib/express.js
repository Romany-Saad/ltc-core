"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require('express');
var cors = require('cors');
var express = Express();
express.use(cors());
express.disable('x-powered-by');
exports.default = express;
