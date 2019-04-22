"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncEventEmitter = require('async-eventemitter');
const globalEventEmitter = new AsyncEventEmitter();
exports.default = globalEventEmitter;
