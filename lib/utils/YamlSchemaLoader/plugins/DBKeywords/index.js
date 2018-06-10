"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_exists_1 = require("./db-exists");
const db_unique_1 = require("./db-unique");
exports.default = (ajv, options) => {
    ajv = db_exists_1.default(ajv, options);
    ajv = db_unique_1.default(ajv, options);
    return ajv;
};
