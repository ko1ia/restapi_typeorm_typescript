"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const DataBase = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'node_postgres',
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/../models/entity/*.{js,ts}`],
    migrations: [`${__dirname}/../models/migration/*.{js,ts}`],
    subscribers: [],
});
exports.DataBase = DataBase;
