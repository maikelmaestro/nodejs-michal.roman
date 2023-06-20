"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionKeyUpdateSchema = exports.sessionKeyCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.sessionKeyCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    key: joi_1.default.string().required(),
    sessionId: joi_1.default.string().required(),
    expiration: joi_1.default.date().required(),
    users: joi_1.default.array().optional(),
});
exports.sessionKeyUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    key: joi_1.default.string().optional(),
    sessionId: joi_1.default.string().optional(),
    expiration: joi_1.default.date().optional(),
    users: joi_1.default.array().optional(),
});
//# sourceMappingURL=session-key.model.js.map