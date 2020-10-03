const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const CRYPTO = require("crypto-js");
const EMBED = require("../../../utils/Embed");

let hashs = ["MD5", "SHA256", "SHA512"];

class Hash extends COMMAND {

    constructor(){
        super("hash", "Permet de hash une phrase en MD5 ou Sha256", "utils");

        this.setUsage("<type de hash, voici la liste : " + hashs.join(", ") + "> <phrase>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(args.length < 2 || !hashs.includes(args[0].toUpperCase())) return false;

        EMBED.send("Voici votre hash : ``" + CRYPTO[args.shift().toUpperCase()](args).toString() + "``", message.channel);
    }
}

module.exports = Hash;