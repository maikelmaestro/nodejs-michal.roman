"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_da_1 = require("../user/user.da");
const HttpException_1 = require("../../exceptions/HttpException");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class AuthService {
    constructor() {
        this.userDa = user_da_1.UserDa.getInstance();
    }
    async signUp(payload) {
        const found = await this.userDa.findByEmail(payload.email);
        if (found) {
            throw new HttpException_1.HttpException(400, 'User with this email already exists');
        }
        let uid;
        try {
            const { uid: createdId } = await firebase_admin_1.default.auth().createUser(payload);
            uid = createdId;
        }
        catch (error) {
            console.error(error);
            throw new HttpException_1.HttpException(400, 'User with this email already exists');
        }
        const { id } = await this.userDa.createOne({ email: payload.email, firebaseId: uid, createdAt: new Date() });
        return await this.userDa.findOne(id);
    }
    async logout() {
        console.log('logout');
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map