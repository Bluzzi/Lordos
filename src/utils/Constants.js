const SETTINGS = require("../../settings.json");
const DISCORD = require("discord.js");

class Constants {

    /**
     * @returns {string} prefix
     */
    static get prefix(){
        return SETTINGS.prefix;
    }

    /**
     * @returns {string} token
     */
    static get token(){
        return SETTINGS.token;
    }

    /**
     * @returns {string[]} admin
     */
    static async getAdmins(){
        let app = await MAIN.CLIENT.fetchApplication();
        
        return app.owner.members.map(m => m.id);
    }

    /**
     * @returns {string} key
     */
    static get giffy_key(){
        return SETTINGS.giffykey;
    }
}

module.exports = Constants;