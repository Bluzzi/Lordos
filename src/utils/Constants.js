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

    static get youtubeKey(){
        return SETTINGS["youtube-key"];
    }

    /**
     * @returns {string[]} admin
     */
    static async getAdmins(){
        let app = await CLIENT.fetchApplication();
        
        return app.owner.members.map(m => m.id);
    }
}

module.exports = Constants;