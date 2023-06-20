"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const colors_1 = __importDefault(require("colors"));
function loggerMiddleware(req, res, next) {
    const CONST_NOW = new Date();
    res.on('finish', () => {
        if (res.statusCode >= 400) {
            console.error(colors_1.default.red('[ERROR]'), CONST_NOW, 'Endpoint:' + colors_1.default.red(req.url), 'Code:' + colors_1.default.red(res.statusCode.toString()), 'Method:' + colors_1.default.red(req.method.toUpperCase()), 'Body:' + JSON.stringify(req.body), 'Message:' + colors_1.default.red(res.statusMessage || ''));
        }
        else {
            console.log(colors_1.default.cyan('[INFO]'), CONST_NOW, 'Endpoint:' + colors_1.default.cyan(req.url), 'Code:' + colors_1.default.cyan(res.statusCode.toString()), 'Method:' + colors_1.default.cyan(req.method.toUpperCase()), 'Body:' + colors_1.default.cyan(JSON.stringify(req.body)));
        }
    });
    next();
}
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map