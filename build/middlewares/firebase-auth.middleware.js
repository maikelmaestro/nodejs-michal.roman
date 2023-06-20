"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAuthMiddleware = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const tslogger_1 = require("../logger/tslogger");
async function firebaseAuthMiddleware(req, res, next) {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
        return res.send({ message: 'No token provided' }).status(401);
    }
    if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
        res.send({ message: 'Invalid token' }).status(401);
    }
    const token = headerToken.split(' ')[1];
    try {
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.user = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.uid;
        next();
    }
    catch (error) {
        tslogger_1.logger.errorLog(req, error.message);
        res.status(401).send({ message: 'Could not authorize' });
    }
}
exports.firebaseAuthMiddleware = firebaseAuthMiddleware;
//# sourceMappingURL=firebase-auth.middleware.js.map