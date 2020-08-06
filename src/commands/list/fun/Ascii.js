const COMMAND = require("../../Command");
const COOL_DISCORD_THINGS = require("../../../utils/CoolDiscordThings");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Ascii extends COMMAND {

    constructor(){
        super("ascii", "Transformer votre texte en ASCII-art", "fun");

        this.setUsage("<votre texte>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;

        if(args.join(" ").length >= 23) return EMBED.send("Le nombre de caractère maximal est de 22", message.channel);

        message.channel.send(COOL_DISCORD_THINGS.messageToAscii(args.join(" ")));
    }
}

module.exports = Ascii;