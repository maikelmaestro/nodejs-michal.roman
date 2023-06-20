"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudController = void 0;
const api_consts_1 = require("../shared/api.consts");
class CrudController {
    constructor(service) {
        this.service = service;
    }
    async createOneWithoutUserFilter(req, res) {
        try {
            const created = await this.service.createOne(req.body);
            return res.json(created);
        }
        catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }
    async createOne(req, res) {
        const body = Object.assign({}, req.body);
        body.user = req.user || undefined;
        try {
            const created = await this.service.createOne(body);
            return res.json(created);
        }
        catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }
    async find(req, res) {
        var _a, _b;
        let filter;
        if ((_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.length) {
            filter = JSON.parse(decodeURIComponent(req.query.filter));
        }
        const sort = ((_b = req.query.sort) === null || _b === void 0 ? void 0 : _b.length) ? JSON.parse(decodeURIComponent(req.query.sort)) : api_consts_1.DEFAULT_SORT;
        if (req.user) {
            filter = Object.assign(Object.assign({}, filter), { user: req.user });
        }
        try {
            const items = await this.service.find({ filter, sort });
            return res.json(items);
        }
        catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
    async findWithoutUserFilter(req, res) {
        var _a, _b;
        let filter;
        if ((_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.length) {
            filter = JSON.parse(decodeURIComponent(req.query.filter));
        }
        const sort = ((_b = req.query.sort) === null || _b === void 0 ? void 0 : _b.length) ? JSON.parse(decodeURIComponent(req.query.sort)) : api_consts_1.DEFAULT_SORT;
        try {
            const items = await this.service.find({ filter, sort });
            return res.json(items);
        }
        catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
    async findOne(req, res) {
        try {
            const item = await this.service.findOne(req.params._id);
            return res.json(item);
        }
        catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
    async updateOne(req, res) {
        try {
            const item = await this.service.updateOne(req.params._id, req.body);
            return res.json(item);
        }
        catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
    async deleteOne(req, res) {
        try {
            const deleted = await this.service.deleteOne(req.params._id);
            return res.json(deleted);
        }
        catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
}
exports.CrudController = CrudController;
//# sourceMappingURL=crud.controller.js.map