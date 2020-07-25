const DISCORD = require("discord.js");

class Embed {

    static send(message, channel){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);
        embed.setColor("#20A765");

        channel.send(embed);
    }
}

module.exports = Embed;