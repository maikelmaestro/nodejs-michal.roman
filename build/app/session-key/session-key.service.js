"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionKeyService = void 0;
const base_service_1 = require("../base/base.service");
const session_key_da_1 = require("./session-key.da");
class SessionKeyService extends base_service_1.BaseService {
    constructor() {
        super(session_key_da_1.SessionKeyDa.getInstance());
    }
    static getInstance() {
        if (!SessionKeyService.instance) {
            SessionKeyService.instance = new SessionKeyService();
        }
        return SessionKeyService.instance;
    }
    async find(options) {
        return await this.dataAccess.find(options);
    }
}
exports.SessionKeyService = SessionKeyService;
//# sourceMappingURL=session-key.service.js.map