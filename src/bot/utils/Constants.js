const SETTINGS = require("../../../settings.json");
const DISCORD = require("discord.js");

class Constants {

    /**
     * @returns {string} prefix
     */
    static get prefix(){
        return SETTINGS["prefix"];
    }

    /**
     * @returns {string} token
     */
    static get token(){
        return SETTINGS["token"];
    }
    
    /**
     * @returns {string} youtube-key
     */
    static get youtubeKey(){
        return SETTINGS["youtube-key"];
    }

    /**
     * @returns {string} joke-key
     */
    static get jokeKey(){
        return SETTINGS["joke-key"];
    }

    /**
     * @returns {DISCORD.TeamMember[]} admin
     */
    static async getAdmins(){
        let app = await BOT.CLIENT.fetchApplication();
        
        return app.owner.members;
    }
}

module.exports = Constants;