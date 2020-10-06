const MYSQL = require("./core/database/MySQL");
const CONFIG = require("./core/database/Config");

class Main {

    /**
     * @returns {MYSQL}
     */
    get mysql(){
        return MYSQL;
    }

    /**
     * @returns {CONFIG}
     */
    get config(){
        return CONFIG;
    }
}

module.exports = new Main();