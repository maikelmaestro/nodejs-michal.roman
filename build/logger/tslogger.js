"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const colors_1 = __importDefault(require("colors"));
const checkRouteMethods_1 = require("../app/utils/checkRouteMethods");
class DRLogger {
    constructor() {
        this.info = console.log;
        this.success = console.log;
        this.warn = console.warn;
        this.error = console.error;
        this.fatal = console.error;
        this.now = new Date();
        this.infoLog = (req) => {
            const { model, method } = (0, checkRouteMethods_1.checkRouteMethods)(req);
            console.log(colors_1.default.cyan('[INFO]'), this.now, 'Endpoint:' + colors_1.default.cyan(model), 'Method:' + colors_1.default.cyan(method.toUpperCase()), 'Body:' + JSON.stringify(req.body));
        };
        this.successLog = (req) => {
            const { model, method } = (0, checkRouteMethods_1.checkRouteMethods)(req);
            console.log(colors_1.default.green('[SUCCESS]'), this.now, 'Endpoint:' + colors_1.default.green(model), 'Method:' + colors_1.default.green(method.toUpperCase()), 'Body:' + JSON.stringify(req.body));
        };
        this.warnLog = (req) => {
            const { model, method } = (0, checkRouteMethods_1.checkRouteMethods)(req);
            console.warn(colors_1.default.yellow('[WARN]'), this.now, 'Endpoint:' + colors_1.default.yellow(model), 'Method:' + colors_1.default.yellow(method.toUpperCase()), 'Body:' + JSON.stringify(req.body));
        };
        this.errorLog = (req, message) => {
            const { model, method } = (0, checkRouteMethods_1.checkRouteMethods)(req);
            console.error(colors_1.default.red('[ERROR]'), this.now, 'Endpoint:' + colors_1.default.red(model), 'Method:' + colors_1.default.red(method.toUpperCase()), 'Body:' + JSON.stringify(req.body), 'Message:' + colors_1.default.red(message || ''));
        };
        this.fatalLog = (req) => {
            const { model, method } = (0, checkRouteMethods_1.checkRouteMethods)(req);
            console.error(colors_1.default.red('[FATAL]'), this.now, 'Endpoint:' + colors_1.default.red(model), 'Method:' + colors_1.default.red(method.toUpperCase()), 'Body:' + JSON.stringify(req.body));
        };
    }
}
exports.logger = new DRLogger();
//# sourceMappingURL=tslogger.js.map