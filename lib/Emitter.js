"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncEventEmitter = require('async-eventemitter');
var globalEventEmitter = new AsyncEventEmitter();
exports.default = globalEventEmitter;
