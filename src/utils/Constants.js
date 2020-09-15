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

    static get jokeKey(){
        return SETTINGS["joke-key"];
    }

    /**
     * @returns {DISCORD.TeamMember[]} admin
     */
    static async getAdmins(){
        let app = await MAIN.CLIENT.fetchApplication();
        
        return app.owner.members;
    }
}

module.exports = Constants;