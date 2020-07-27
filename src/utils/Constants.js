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
}

module.exports = Constants;