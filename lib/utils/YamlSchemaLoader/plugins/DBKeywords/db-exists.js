"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ajv, options) => {
    ajv.addKeyword("db-exists", {
        type: ["string", "integer", "number"],
        async: true,
        metaSchema: {
            required: ['repositoryId', 'field'],
            properties: {
                repositoryId: { type: "string" },
                field: { type: "string" },
            }
        },
        errors: true,
        modifying: false,
        validate: (schema, value, parentSchema, currentDataPath, rootValue) => __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            const repositoryId = schema["repositoryId"];
            const field = schema["field"];
            const repo = options.app.get(repositoryId);
            const result = yield repo.find({ [field]: value }, 1, 0);
            if (!result || result.length < 1) {
                errors.push({
                    keyword: "db-exists",
                    dataPath: currentDataPath,
                    schemaPath: currentDataPath,
                    params: schema,
                    message: `an item with '${field}' equal to '${value}' was not found`
                });
            }
            if (errors.length > 0) {
                return Promise.reject({
                    message: `an item with '${field}' equal to '${value}' was not found`,
                    errors: errors,
                    ajv: true,
                    validation: false,
                });
            }
            return Promise.resolve({
                message: "",
                errors: [],
                ajv: true,
                validation: true,
            });
        }),
    });
    return ajv;
};
