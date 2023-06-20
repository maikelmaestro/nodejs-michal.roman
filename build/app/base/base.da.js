"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDa = void 0;
const DBConnections_1 = require("../../services/databases/DBConnections");
const HttpException_1 = require("../../exceptions/HttpException");
const redis_1 = require("../cache/redis");
const generateRedisKey_1 = require("../utils/generateRedisKey");
class BaseDa {
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.cachePrefix = this.collectionName;
        this.getDB();
    }
    async find(query) {
        const cacheKey = (0, generateRedisKey_1.generateRedisKey)(this.cachePrefix, query.filter);
        const cacheData = await redis_1.redisCache.getJSON(cacheKey);
        if (cacheData)
            return cacheData;
        try {
            const data = await this.database.collection(this.collectionName).find(query.filter).sort(query.sort).toArray();
            await redis_1.redisCache.setJSON(cacheKey, data);
            return data;
        }
        catch (error) {
            throw new HttpException_1.HttpException(error.status, `Unable to find ${this.collectionName} items`);
        }
    }
    async findOne(id) {
        const cacheKey = (0, generateRedisKey_1.generateRedisKey)(this.cachePrefix);
        let found = await redis_1.redisCache.getJSON(`${cacheKey}:${id}`);
        if (found)
            return found;
        try {
            found = await this.database.collection(this.collectionName).findOne({ _id: id });
        }
        catch (error) {
            throw new HttpException_1.HttpException(error.status, `Unable to find ${this.collectionName} with id ${id}`);
        }
        if (!found) {
            throw new HttpException_1.HttpException(404, `Unable to find ${this.collectionName} with id ${id}`);
        }
        await redis_1.redisCache.setJSON(`${cacheKey}:${id}`, found);
        return found;
    }
    async createOne(payload) {
        try {
            const created = await this.database.collection(this.collectionName).insertOne(payload);
            await redis_1.redisCache.reset();
            return { id: created.insertedId };
        }
        catch (error) {
            throw new HttpException_1.HttpException(error.status, `Unable to create ${this.collectionName}`);
        }
    }
    async updateOne(id, payload) {
        const cacheKey = (0, generateRedisKey_1.generateRedisKey)(this.cachePrefix);
        try {
            const item = await this.database.collection(this.collectionName).findOneAndUpdate({ _id: id }, { $set: payload }, { returnDocument: 'after' });
            await redis_1.redisCache.reset();
            await redis_1.redisCache.setJSON(`${cacheKey}:${id}`, item.value);
            return item.value;
        }
        catch (error) {
            throw new HttpException_1.HttpException(error.status, `Unable to update ${this.collectionName} with id ${id}`);
        }
    }
    async deleteOne(id) {
        const cacheKey = (0, generateRedisKey_1.generateRedisKey)(this.cachePrefix);
        try {
            const deleted = await this.database.collection(this.collectionName).deleteOne({ _id: id });
            if (deleted.deletedCount === 0) {
                return { deleted: false };
            }
            await redis_1.redisCache.reset();
            // await redisCache.del(`${cacheKey}:${id}`)
            // const fromCache = await redisCache.getJSON(cacheKey)
            //
            // if (fromCache) {
            //   const filtered = fromCache.filter(item => item._id !== id.toString())
            //   await redisCache.setJSON(cacheKey, filtered)
            // }
            return { deleted: true };
        }
        catch (error) {
            throw new HttpException_1.HttpException(error.status, `Unable to delete ${this.collectionName} with id ${id}`);
        }
    }
    async getDB() {
        this.database = await DBConnections_1.DBConnections.getDatabase();
    }
}
exports.BaseDa = BaseDa;
//# sourceMappingURL=base.da.js.map