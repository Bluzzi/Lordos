const DISCORD = require("discord.js");

class Embed {

    static send(message, channel, color = "#20A765"){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);
        embed.setColor(color);

        channel.send(embed);
    }
}

module.exports = Embed;