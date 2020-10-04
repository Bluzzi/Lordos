const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/ColorConstants");

class Dice extends COMMAND {

    constructor(){
        super("dice", "Lance un dé", "fun");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let num = Math.floor(Math.random() * 6 + 1);

        let file = new DISCORD.MessageAttachment(__dirname + "/../../../../resources/images/dices/dice-"+ num + ".jpg", "shifumi.png");

        EMBED.send(
            "Les dés sont jetés !",
            message.channel, 
            {attachment: file}
        );
    }
}

module.exports = Dice;