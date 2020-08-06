const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Annonce extends COMMAND {

    constructor(){
        super("annonce", "Envoyer une annonce sous forme d'embed", "utils");

        this.setUsage("<texte>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;
        
        message.delete();
        EMBED.send(args.join(" "), message.channel);
    }
}

module.exports = Annonce;