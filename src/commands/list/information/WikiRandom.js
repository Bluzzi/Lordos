const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class WikiRandom extends COMMAND {

    constructor(){
        super("wikirandom", "Renvoie un lien vers une page wikipédia aléatoire", "information");

        this.setAliases(["wikir"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        EMBED.send("[Découvrir une information !](https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard)", message.channel)
    }
}
module.exports = WikiRandom;