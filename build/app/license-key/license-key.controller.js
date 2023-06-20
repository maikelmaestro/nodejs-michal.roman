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
exports.LicenseKeyController = void 0;
const express = __importStar(require("express"));
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const license_key_model_1 = require("./license-key.model");
const api_consts_1 = require("../shared/api.consts");
const database_consts_1 = require("../shared/database.consts");
const query_validator_1 = require("../shared/query.validator");
const firebase_auth_middleware_1 = require("../../middlewares/firebase-auth.middleware");
const crud_controller_1 = require("../base/crud.controller");
class LicenseKeyController extends crud_controller_1.CrudController {
    constructor(service) {
        super(service);
        this.router = express.Router();
        this.path = api_consts_1.API_VERSION_PATH;
        this.collectionName = database_consts_1.COLLECTION_LICENSE_KEY;
        this.call = fn => (req, res, next) => this[fn](req, res, next);
        this.initRouter();
    }
    async initRouter() {
        this.router.get(`/${this.collectionName}`, [
            firebase_auth_middleware_1.firebaseAuthMiddleware
        ], this.call('find'));
        this.router.get(`/${this.collectionName}/:_id`, [
            firebase_auth_middleware_1.firebaseAuthMiddleware,
            (0, validator_middleware_1.validateParams)(query_validator_1.paramsSchema)
        ], this.call('findOne'));
        this.router.post(`/${this.collectionName}/`, [
            firebase_auth_middleware_1.firebaseAuthMiddleware,
            (0, validator_middleware_1.validateRequest)(license_key_model_1.licenseKeyCreateSchema)
        ], this.call('createOne'));
        this.router.delete(`/${this.collectionName}/:_id`, [
            firebase_auth_middleware_1.firebaseAuthMiddleware,
            (0, validator_middleware_1.validateParams)(query_validator_1.paramsSchema)
        ], this.call('deleteOne'));
        this.router.put(`/${this.collectionName}/:_id`, [
            firebase_auth_middleware_1.firebaseAuthMiddleware,
            (0, validator_middleware_1.validateParams)(query_validator_1.paramsSchema),
            (0, validator_middleware_1.validateRequest)(license_key_model_1.licenseKeyUpdateSchema)
        ], this.call('updateOne'));
    }
}
exports.LicenseKeyController = LicenseKeyController;
//# sourceMappingURL=license-key.controller.js.map