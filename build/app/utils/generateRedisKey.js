"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRedisKey = void 0;
function generateRedisKey(prefix, filter) {
    if (!filter)
        return prefix;
    Object.keys(filter).map(key => {
        prefix += `:${key}:${filter[key]}`;
    });
    return `${prefix}`;
}
exports.generateRedisKey = generateRedisKey;
//# sourceMappingURL=generateRedisKey.js.map