"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRouteMethods = void 0;
const checkRouteMethods = (req) => {
    // const model = (req.route.path).split('/')[1]
    const model = req.route.path;
    const method = Object.keys(req.route.methods);
    return { model, method: method[0] };
};
exports.checkRouteMethods = checkRouteMethods;
//# sourceMappingURL=checkRouteMethods.js.map