"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnections = void 0;
const mongodb_1 = require("mongodb");
const cluster = require('cluster');
const configFactory_1 = require("../../factories/configFactory");
const tslogger_1 = require("../../logger/tslogger");
const colors_1 = __importDefault(require("colors"));
const database_consts_1 = require("../../app/shared/database.consts");
class DBConnections {
    /***
     *
     * @param isMaster true if current thread is master from cluster
     */
    constructor(isMaster) {
        this.config = configFactory_1.ConfigFactory.getConfig();
        tslogger_1.logger.info(colors_1.default.yellow('Creating Mongo client ' + this.config.mongoDbUri));
        this.mongoClient = mongodb_1.MongoClient.connect(encodeURI(this.config.mongoDbUri)).then(async (res) => {
            tslogger_1.logger.info(colors_1.default.cyan('Mongo client connected!'));
            DBConnections.isConnected = true;
            return res;
        });
    }
    static getInstance() {
        if (!DBConnections.instance) {
            DBConnections.instance = new DBConnections(cluster.isMaster);
        }
        return DBConnections.instance;
    }
    getMongoClient() {
        return this.mongoClient;
    }
    static async getDatabase() {
        const client = await DBConnections.getInstance().getMongoClient();
        return client.db(database_consts_1.DATABASE_NAME);
    }
}
exports.DBConnections = DBConnections;
DBConnections.isConnected = false;
//# sourceMappingURL=DBConnections.js.map