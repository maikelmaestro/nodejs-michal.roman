"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionKeyDa = void 0;
const base_da_1 = require("../base/base.da");
const database_consts_1 = require("../shared/database.consts");
class SessionKeyDa extends base_da_1.BaseDa {
    constructor() {
        super(database_consts_1.COLLECTION_SESSION_KEY);
    }
    static getInstance() {
        if (!SessionKeyDa.instance) {
            SessionKeyDa.instance = new SessionKeyDa();
        }
        return SessionKeyDa.instance;
    }
}
exports.SessionKeyDa = SessionKeyDa;
//# sourceMappingURL=session-key.da.js.map