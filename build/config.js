"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require('dotenv').config();
exports.config = function () {
    let node_env = process.env.NODE_ENV || 'localhost'; // 'prod' OR 'dev'
    if (node_env === 'production') {
        node_env = 'prod';
    }
    return configuration[node_env];
};
let configuration = {
    prod: {
        mongoDbUri: 'mongodb+srv://DecisionUser248:advREX2kXa4JaBQD@decisioncluster.fcpws.mongodb.net/Decision?retryWrites=true&w=majority&readPreference=nearest',
        mongoDatabase: 'Decision',
        landingPageUrl: 'https://decisionrules.io/',
        version: '1.0.0'
    },
    localhost: {
        mongoDbUri: 'mongodb+srv://admin:Qwerty123@cluster0.hqmuck9.mongodb.net/key-storage?retryWrites=true&w=majority',
        mongoDatabase: 'Decision',
        landingPageUrl: 'https://decisionrules.io/',
        version: '1.0.0'
    },
};
//# sourceMappingURL=config.js.map