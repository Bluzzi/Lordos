const MYSQL = require("mysql2");

let identifiers = require("../settings.json").mysql;

global.SQLConnection = MYSQL.createConnection({
    host: identifiers.host,
    port: identifiers.port,
    user: identifiers.user,
    password: identifiers.password,
    database: identifiers.database
});