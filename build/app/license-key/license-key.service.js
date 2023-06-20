"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseKeyService = void 0;
const base_service_1 = require("../base/base.service");
const license_key_da_1 = require("./license-key.da");
class LicenseKeyService extends base_service_1.BaseService {
    constructor() {
        super(license_key_da_1.LicenseKeyDa.getInstance());
    }
    static getInstance() {
        if (!LicenseKeyService.instance) {
            LicenseKeyService.instance = new LicenseKeyService();
        }
        return LicenseKeyService.instance;
    }
}
exports.LicenseKeyService = LicenseKeyService;
//# sourceMappingURL=license-key.service.js.map