"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.paramsSchema = joi_1.default.object({
    _id: joi_1.default.string().required(),
});
const queryParamsSchema = joi_1.default.object({
    filter: joi_1.default.optional(),
    page: joi_1.default.number().integer().positive().required(),
    limit: joi_1.default.number().integer().positive().max(100),
});
//# sourceMappingURL=query.validator.js.map