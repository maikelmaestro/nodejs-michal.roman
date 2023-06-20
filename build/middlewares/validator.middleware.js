"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateRequest = void 0;
const tslogger_1 = require("../logger/tslogger");
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            tslogger_1.logger.errorLog(req, error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};
exports.validateRequest = validateRequest;
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            tslogger_1.logger.errorLog(req, error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validator.middleware.js.map