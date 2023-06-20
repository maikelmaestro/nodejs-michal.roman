"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = exports.userCreateSchema = exports.userAuthSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userAuthSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.userCreateSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    firebaseId: joi_1.default.string().required(),
    firstname: joi_1.default.string(),
    surname: joi_1.default.string(),
});
exports.userUpdateSchema = joi_1.default.object({
    firstname: joi_1.default.string().optional(),
    surname: joi_1.default.string().optional(),
});
//# sourceMappingURL=user.model.js.map