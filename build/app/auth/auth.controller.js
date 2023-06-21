"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express = __importStar(require("express"));
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const user_model_1 = require("../user/user.model");
const auth_service_1 = require("./auth.service");
const api_consts_1 = require("../shared/api.consts");
class AuthController {
    constructor() {
        this.router = express.Router();
        this.path = api_consts_1.API_VERSION_PATH;
        this.service = new auth_service_1.AuthService();
        this.call = fn => (req, res, next) => this[fn](req, res, next);
        this.initRouter();
    }
    async initRouter() {
        this.router.post(`/sign-up`, [
            (0, validator_middleware_1.validateRequest)(user_model_1.userAuthSchema)
        ], this.call('signUp'));
        this.router.post(`/logout`, [], this.call('logout'));
    }
    async signUp(req, res) {
        try {
            const user = await this.service.signUp(req.body);
            return res.json(user);
        }
        catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
    async logout(req, res) {
        try {
            const { logout } = await this.service.logout();
            return res.json(logout);
        }
        catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map