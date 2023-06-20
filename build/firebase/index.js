"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const credentials = require('../../firebase-credentials.json');
const firebaseApp = () => firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(credentials),
    databaseURL: 'https://api-keys-ef507.firebaseio.com',
});
exports.firebaseApp = firebaseApp;
//# sourceMappingURL=index.js.map