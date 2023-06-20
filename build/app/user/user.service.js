"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const base_service_1 = require("../base/base.service");
const user_da_1 = require("./user.da");
class UserService extends base_service_1.BaseService {
    constructor() {
        super(user_da_1.UserDa.getInstance());
    }
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map