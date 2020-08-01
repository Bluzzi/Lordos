const DISCORD = require("discord.js");

const COLOR_GREEN = "#20A765";

class Embed {

    /**
     * @param {String} message message to send
     * @param {DISCORD.Channel} channel a discord channel
     * @param {{color: String, image: String}|String} options embed color
     * @returns {void} void
     * @deprecated Options should be an object, String usage is deprecated
     */

    static send(message, channel, options = {color: null, image: null}){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);
        
        // Prevent older uses:
        if(typeof options == "string") options = {color: options, image: null};

        // Set default color :
        embed.setColor(COLOR_GREEN);

        // Set options :
        if(options["color"]) embed.setColor(options["color"]);
        if(options["image"]) embed.setImage(options["image"]);

        return channel.send(embed);
    }
}

module.exports = Embed;

module.exports.COLOR_GREEN = COLOR_GREEN;