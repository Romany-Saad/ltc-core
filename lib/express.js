"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require('express');
const server = express();
server.use(cors());
exports.default = server;
