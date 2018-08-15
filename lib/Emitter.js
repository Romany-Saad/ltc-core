"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const globalEventEmitter = new events_1.EventEmitter();
exports.default = globalEventEmitter;
