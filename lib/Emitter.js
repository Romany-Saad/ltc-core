"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const globalEventEmitter = new EventEmitter();
exports.default = globalEventEmitter;
