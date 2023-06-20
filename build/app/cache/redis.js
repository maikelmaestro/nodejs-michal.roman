"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisCache = void 0;
const redis_1 = require("redis");
const colors_1 = require("colors");
require('dotenv').config();
class RedisCache {
    constructor() {
        this.expireInSeconds = 60 * 60;
        this.url = `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;
        this.init();
    }
    async init() {
        try {
            this.log((0, colors_1.yellow)(`Connecting to: ${this.url}`));
            this.client = (0, redis_1.createClient)();
            this.client.on('connect', async () => {
                const now = new Date().toISOString();
                await this.client.set('connected', now);
                this.log((0, colors_1.green)(`Connected`));
                this.reset();
            });
            this.client.on('error', (e) => this.log((0, colors_1.red)(e)));
            await this.client.connect();
        }
        catch (e) {
            this.log((0, colors_1.red)('Cannot init cache'));
            this.log((0, colors_1.red)(e));
        }
        return this.client;
    }
    async get(key) {
        return await this.client.get(key);
    }
    async getJSON(key) {
        const entity = await this.client.get(key);
        return JSON.parse(entity);
    }
    async set(key, value, options) {
        return await this.client.set(key, value, { EX: (options === null || options === void 0 ? void 0 : options.EX) || this.expireInSeconds });
    }
    async setJSON(key, value, options) {
        return await this.client.set(key, JSON.stringify(value), { EX: (options === null || options === void 0 ? void 0 : options.EX) || this.expireInSeconds });
    }
    async has(key) {
        return await this.client.exists(key);
    }
    async del(key) {
        return await this.client.del(key);
    }
    async reset() {
        this.log((0, colors_1.dim)(`Flushed all`));
        return await this.client.flushAll();
    }
    log(message) {
        console.log(`${(0, colors_1.red)('Redis:')} ${message}`);
    }
}
exports.redisCache = new RedisCache();
//# sourceMappingURL=redis.js.map