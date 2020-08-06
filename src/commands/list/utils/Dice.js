const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/Color");

class Dice extends COMMAND {

    constructor(){
        super("dice", "Lance un certain nombre de dès", "utils");
        
        this.setUsage("<nombre>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message) {
        if(!args[0]) return false;
        
        let number = parseInt(args[0]) || 1;

        if(number < 1 || number > 20) return EMBED.send("Vous devez entrer un nombre en 1 et 20", message.channel, COLOR.RED);

        let dices = [];

        for(let i = 0; i < number; i++) dices.push(roll());

        let i = 1;

        dices = dices.map(dice => `Dé N°${i++} > **${dice}**`);
        
        EMBED.send("Le(s) dé(s) a/ont été lancé !\n"+dices.join("\n"), message.channel);
    }
}

function roll(){
    return Math.floor(Math.random()*(6 - 1+1)+1);
}

module.exports = Dice;