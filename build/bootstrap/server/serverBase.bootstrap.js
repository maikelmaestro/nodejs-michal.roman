"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBaseBootstrap = void 0;
const audit_server_1 = require("../../server/audit.server");
const api_key_controller_1 = require("../../app/api-key/api-key.controller");
const license_key_controller_1 = require("../../app/license-key/license-key.controller");
const auth_controller_1 = require("../../app/auth/auth.controller");
const api_key_service_1 = require("../../app/api-key/api-key.service");
const license_key_service_1 = require("../../app/license-key/license-key.service");
const session_key_controller_1 = require("../../app/session-key/session-key.controller");
const session_key_service_1 = require("../../app/session-key/session-key.service");
const user_service_1 = require("../../app/user/user.service");
const user_controller_1 = require("../../app/user/user.controller");
class ServerBaseBootstrap {
    constructor() {
        this.workers = Number.parseInt(process.env.WORKERS_NUMBER) || 1;
    }
    /**
     * Function that serves as a template for server init.
     * @protected
     *
     * @returns {Promise<IServerInstances>} Return value is promise due to async character of the method.
     */
    async start() {
        return;
    }
    /**
     * Base method for server init derivative from old cloud settings.
     * @protected
     *
     * @returns {express.Application}
     */
    initServer() {
        const port = process.env.PORT || 3000;
        const apiKeyService = api_key_service_1.ApiKeyService.getInstance();
        const licenseKeyService = license_key_service_1.LicenseKeyService.getInstance();
        const sessionKeyService = session_key_service_1.SessionKeyService.getInstance();
        const userService = user_service_1.UserService.getInstance();
        this.server = new audit_server_1.AuditServer(Number.parseInt(port.toString()), [
            new api_key_controller_1.ApiKeyController(apiKeyService),
            new license_key_controller_1.LicenseKeyController(licenseKeyService),
            new session_key_controller_1.SessionKeyController(sessionKeyService),
            new user_controller_1.UserController(userService),
            new auth_controller_1.AuthController()
        ]);
        // const db = new DBConnections()
        this.server.listen();
        return this.server.app;
    }
}
exports.ServerBaseBootstrap = ServerBaseBootstrap;
//# sourceMappingURL=serverBase.bootstrap.js.map