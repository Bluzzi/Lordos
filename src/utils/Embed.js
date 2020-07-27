const DISCORD = require("discord.js");

class Embed {

    /**
     * @param {String} message message to send
     * @param {Object} channel channel
     * @param {String} color embed color
     * @returns {void} void
     */

    static send(message, channel, color = "#20A765"){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);
        embed.setColor(color);

        channel.send(embed);
    }
}

module.exports = Embed;