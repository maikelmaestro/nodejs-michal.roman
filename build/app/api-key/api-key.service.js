"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyService = void 0;
const api_key_da_1 = require("./api-key.da");
const base_service_1 = require("../base/base.service");
class ApiKeyService extends base_service_1.BaseService {
    constructor() {
        super(api_key_da_1.ApiKeyDa.getInstance());
    }
    static getInstance() {
        if (!ApiKeyService.instance) {
            ApiKeyService.instance = new ApiKeyService();
        }
        return ApiKeyService.instance;
    }
}
exports.ApiKeyService = ApiKeyService;
//# sourceMappingURL=api-key.service.js.map