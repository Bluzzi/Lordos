const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const CHOICE_NUMBER = require("./ChoiceNumber");
const CONSTANTS = require("../../../utils/Constants");
const DISCORD = require("discord.js");

class MyNumber extends COMMAND {
    
    constructor(){
        super("mynumber", "Affiche le nombre que vous avez choisi", "fun");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    execute(args, message){
        if(CHOICE_NUMBER.numbers[message.guild.id]){
            if(CHOICE_NUMBER.numbers[message.guild.id][message.author.id]){
                EMBED.send("Votre nombre est : **" + CHOICE_NUMBER.numbers[message.guild.id][message.author.id] + "**", message.channel);
            }
        } else {
            EMBED.send("Utilisez la commande ``" + CONSTANTS.prefix + "choicenumber`` pour définir votre nombre !", message.channel);
        }
    }
}

module.exports = MyNumber;