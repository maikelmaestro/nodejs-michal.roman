"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const colors_1 = __importDefault(require("colors"));
const moment_1 = __importDefault(require("moment/moment"));
function loggerMiddleware(req, res, next) {
    const CONST_NOW = (0, moment_1.default)().format('DD.MM.YYYY HH:mm:ss');
    res.on('finish', () => {
        if (res.statusCode >= 400) {
            console.error(colors_1.default.dim(CONST_NOW), colors_1.default.red('[ERROR]'), 'Endpoint:' + colors_1.default.red(req.url), 'Code:' + colors_1.default.red(res.statusCode.toString()), 'Method:' + colors_1.default.red(req.method.toUpperCase()), 'Body:' + JSON.stringify(req.body), 'Message:' + colors_1.default.red(res.statusMessage || ''));
        }
        else {
            console.log(colors_1.default.dim(CONST_NOW), colors_1.default.cyan('[INFO]'), 'Endpoint:' + colors_1.default.cyan(req.url), 'Code:' + colors_1.default.cyan(res.statusCode.toString()), 'Method:' + colors_1.default.cyan(req.method.toUpperCase()), 'Body:' + colors_1.default.cyan(JSON.stringify(req.body)));
        }
    });
    next();
}
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map