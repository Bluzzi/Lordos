const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Choice extends COMMAND {

    constructor(){
        super("choice", "Permet de demander au bot de faire un choix", "fun");

        this.setUsage("<choix 1> <choix 2> ...[choix]");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[1]) return false;

        let choice = args[Math.floor(Math.random() * (args.length - 0))];
        let percent = Math.round(1 / args.length * 100);

        EMBED.reply("Mon choix est **" + choice + "** ! (" + percent + "%)", message);
    }
}

module.exports = Choice;