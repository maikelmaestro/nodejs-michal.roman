"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseKeyDa = void 0;
const base_da_1 = require("../base/base.da");
const database_consts_1 = require("../shared/database.consts");
class LicenseKeyDa extends base_da_1.BaseDa {
    constructor() {
        super(database_consts_1.COLLECTION_LICENSE_KEY);
    }
    static getInstance() {
        if (!LicenseKeyDa.instance) {
            LicenseKeyDa.instance = new LicenseKeyDa();
        }
        return LicenseKeyDa.instance;
    }
}
exports.LicenseKeyDa = LicenseKeyDa;
//# sourceMappingURL=license-key.da.js.map