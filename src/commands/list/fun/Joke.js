const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const AXIOS = require("axios");
const EMBED = require("../../../utils/Embed");
const CONSTANTS = require("../../../utils/Constants");

class Joke extends COMMAND {

    constructor(){
        super("joke", "Vous donne une blague", "fun");

        this.setAliases([]);
        this.setPermissions([]);
        this.setUsage("");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
     
    async execute(args, message){
        AXIOS.get("https://www.blagues-api.fr/api/random", {headers: {"Authorization": "Bearer " + CONSTANTS.jokeKey}}).then(response => {
            EMBED.send(response.data.joke + "\n\n||" + response.data.answer + "||", message.channel, {title: "Voici la blague (" + response.data.type + ")"});
        })
    }
}

module.exports = Joke;