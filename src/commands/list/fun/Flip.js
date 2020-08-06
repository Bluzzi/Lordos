const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Flip extends COMMAND {

    constructor(){
        super("flip", "Lance une pièce", "fun");
    }

    async execute(args, message){
        let possibilities = ["pile", "face"];
        let result = possibilities[Math.floor(Math.random() * Math.floor(2))];

        let embed = new DISCORD.MessageEmbed();

        embed.setColor(EMBED.COLOR_GREEN);

        embed.setDescription("La pièce est tombé sur **" + result.toUpperCase() + "** !");

        embed.setImage("attachment://" + result + ".png");
        embed.attachFiles(new DISCORD.MessageAttachment( __dirname + "/../../../../resources/images/pile_or_face/" + result + ".png", result + ".png"));

        message.channel.send(embed);
    }
}

module.exports = Flip;