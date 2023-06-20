"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyDa = void 0;
const base_da_1 = require("../base/base.da");
const database_consts_1 = require("../shared/database.consts");
class ApiKeyDa extends base_da_1.BaseDa {
    constructor() {
        super(database_consts_1.COLLECTION_API_KEY);
    }
    static getInstance() {
        if (!ApiKeyDa.instance) {
            ApiKeyDa.instance = new ApiKeyDa();
        }
        return ApiKeyDa.instance;
    }
}
exports.ApiKeyDa = ApiKeyDa;
//# sourceMappingURL=api-key.da.js.map