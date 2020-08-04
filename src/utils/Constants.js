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
     * @returns {Array<String>} admin
     */

    static get admins(){
        return require("../../resources/configs/admins.json").admins;
    }
}

module.exports = Constants;