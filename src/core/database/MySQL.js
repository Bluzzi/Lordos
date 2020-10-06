const MYSQL = require("mysql2");
const IDENTIFIERS = require("../../../settings.json").mysql;

class MySQL {

    #connection;

    constructor(){
        this.#connection = MYSQL.createConnection({
            host: IDENTIFIERS.host,
            port: IDENTIFIERS.port,

            user: IDENTIFIERS.user,
            password: IDENTIFIERS.password,

            database: IDENTIFIERS.database
        });
    }

    /**
     * @returns {MYSQL.Connection}
     */
    get connection(){
        return this.#connection;
    }

    /**
     * @param {string} request SQL request
     * @returns {MYSQL.RowDataPacket[]|MYSQL.RowDataPacket[][]|OkPacket|OkPacket[]|ResultSetHeader}
     */
    query(request){
        return new Promise((resolve, reject) => {
            this.connection.query(request, (error, results) => {
                if(error) reject(error);

                resolve(results);
            });
        });
    }
}

module.exports = new MySQL();