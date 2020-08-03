const SETTINGS = require("../../settings.json");

class Constants {

    /**
     * @returns {String} prefix
    */
    static get prefix(){
        return SETTINGS.prefix;
    }

    /**
     * @returns {String} token
    */
    static get token(){
        return SETTINGS.token;
    }

    /**
     * @returns {string} key
     */
    static get giffy_key(){
        return SETTINGS.giffykey;
    }
}

module.exports = Constants;