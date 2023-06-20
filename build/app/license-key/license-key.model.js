"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseKeyUpdateSchema = exports.licenseKeyCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.licenseKeyCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    key: joi_1.default.string().required(),
    keyType: joi_1.default.string().required(),
    expiration: joi_1.default.date().required(),
});
exports.licenseKeyUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    key: joi_1.default.string().optional(),
    keyType: joi_1.default.string().optional(),
    expiration: joi_1.default.date().optional(),
});
//# sourceMappingURL=license-key.model.js.map