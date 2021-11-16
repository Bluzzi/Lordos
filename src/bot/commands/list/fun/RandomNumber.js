const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class RandomNumber extends COMMAND {

    constructor(){
        super("randomnumber", "Générer un nombre aléatoire entre deux valeurs", "fun");

        this.setUsage("<min> <max>");
        this.setAliases(["rn"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(args.length < 2 || parseInt(args[0]) > parseInt(args[1])) return false;

        args = args.map(num => parseInt(num));

        EMBED.reply(Math.floor((Math.random() * (args[1] - args[0] + 1)) + args[0]).toString(), message);
    }
}

module.exports = RandomNumber;