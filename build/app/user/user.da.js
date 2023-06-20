"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDa = void 0;
const base_da_1 = require("../base/base.da");
const database_consts_1 = require("../shared/database.consts");
class UserDa extends base_da_1.BaseDa {
    constructor() {
        super(database_consts_1.COLLECTION_USER);
    }
    static getInstance() {
        if (!UserDa.instance) {
            UserDa.instance = new UserDa();
        }
        return UserDa.instance;
    }
    async findByEmail(email) {
        return await this.database.collection(this.collectionName).findOne({ email });
    }
    async findByFirebaseId(firebaseId) {
        return await this.database.collection(this.collectionName).findOne({ firebaseId });
    }
}
exports.UserDa = UserDa;
//# sourceMappingURL=user.da.js.map