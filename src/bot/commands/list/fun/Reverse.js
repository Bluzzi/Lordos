const COMMAND= require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Reverse extends COMMAND {

    constructor(){
        super("reverse", "Vous renvoie votre texte à l'envers", "fun");

        this.setUsage("<texte>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;

        EMBED.reply(args.join(" ").split("").reverse().join(""), message);
    }
}

module.exports = Reverse;