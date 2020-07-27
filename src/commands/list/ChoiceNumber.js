const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const CONSTANTS = require("../../utils/Constants");

var numbers = {};

class ChoiceNumber extends COMMAND {
    constructor() {
        super("choicenumber", "");
    }

    async execute(args, message){
        if(!args[0]){
            EMBED.send("Vous devez faire ``" + CONSTANTS.prefix + " (votre nombre)``.", message.channel);
            return;
        }

        numbers[message.author.id] = parseInt(args[0]);

        EMBED.send("Vous avez bien choisi votre nombre : " + parseInt(args[0]), message.channel);
    }
}

module.exports = ChoiceNumber;
module.exports.numbers = numbers;