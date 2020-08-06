const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

var numbers = {};

class ChoiceNumber extends COMMAND {

    constructor(){
        super("choicenumber", "Choisir un nombre", "fun");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0] || isNaN(args[0])) return false;

        if(!numbers[message.guild.id]) numbers[message.guild.id] = {};

        numbers[message.guild.id][message.author.id] = parseInt(args[0]);

        EMBED.send("Vous avez bien choisi votre nombre : " + parseInt(args[0]), message.channel);
    }
}

module.exports = ChoiceNumber;
module.exports.numbers = numbers;