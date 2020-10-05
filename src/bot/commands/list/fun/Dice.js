const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/ColorConstants");

class Dice extends COMMAND {

    constructor(){
        super("dice", "Lance un dé", "fun");
        this.setUsage("<number>")
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(args[0]){       
            let number = parseInt(args[0]) || 1;

            if(number < 1 || number > 20) return EMBED.send("Vous devez entrer un nombre en 1 et 20", message.channel, COLOR.RED);

            let dices = [];

            for(let i = 0; i < number; i++) dices.push(this.roll());

            let i = 1;

            let total = dices.reduce((accumulator, currentValue) => accumulator + currentValue)

            dices = dices.map(dice => `Dé N°${i++} -> **${dice}**`);
            
            
            EMBED.send("Les dés sont jetés !\n\n" + dices.join("\n") + "\n\nTotal : **" + total + "**", message.channel);
        } else {
            let num = this.roll();

            let file = new DISCORD.MessageAttachment(__dirname + "/../../../../resources/images/dices/dice-"+ num + ".jpg", "shifumi.png");

            EMBED.send(
                "Les dés sont jetés !",
                message.channel, 
                {attachment: file}
            );
        }
    }

    roll(){
        return Math.floor(Math.random() * 6 + 1);
    }
}

module.exports = Dice;