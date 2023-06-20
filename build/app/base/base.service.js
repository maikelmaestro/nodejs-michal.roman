"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const mongodb_1 = require("mongodb");
const HttpException_1 = require("../../exceptions/HttpException");
class BaseService {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
    }
    async createOne(payload) {
        const body = Object.assign({}, payload);
        body.createdAt = new Date();
        const { id } = await this.dataAccess.createOne(body);
        return await this.dataAccess.findOne(id);
    }
    async find(query) {
        return await this.dataAccess.find(query);
    }
    async findOne(id) {
        const _id = new mongodb_1.ObjectId(id);
        if (!_id) {
            throw new HttpException_1.HttpException(404, `Invalid id ${_id}`);
        }
        return await this.dataAccess.findOne(_id);
    }
    async updateOne(id, payload) {
        const _id = new mongodb_1.ObjectId(id);
        if (!_id) {
            throw new HttpException_1.HttpException(404, `Invalid id ${_id}`);
        }
        const body = Object.assign({}, payload);
        body.updatedAt = new Date();
        return await this.dataAccess.updateOne(_id, body);
    }
    async deleteOne(id) {
        const _id = new mongodb_1.ObjectId(id);
        if (!_id) {
            throw new HttpException_1.HttpException(404, `Invalid id ${_id}`);
        }
        const { deleted } = await this.dataAccess.deleteOne(_id);
        if (!deleted) {
            throw new HttpException_1.HttpException(400, `Unable to delete item with id ${_id}`);
        }
        return { deleted };
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map