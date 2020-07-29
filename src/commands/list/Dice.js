const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Dice extends COMMAND {
    constructor() {
        super("dice", "<nombre>", "des");
    }

    async execute(args, message) {
        if (!args[0]) {
            return false;
        } else {   
            let number = parseInt(args[0]) || 1;
            if (number < 1 || number > 20) return EMBED.send("Vous devez entrer un nombre en 1 et 20", message.channel, 'RED')
            //else:

            let dices = [];
            for(let i = 0; i < number; i++) {
                dices.push(roll());
            }

            let i = 1;
            dices = dices.map(dice => `Dé N°${i++} > **${dice}**`);
            EMBED.send("Le(s) dé(s) a/ont été lancé !\n"+dices.join("\n"), message.channel);
        }
    }
}

function roll() {
    return Math.floor(Math.random()*(6 - 1+1)+1);
}

module.exports = Dice;