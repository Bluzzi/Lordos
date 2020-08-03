const DISCORD = require("discord.js");

const COLOR_GREEN = "#20A765";

class Embed {

    /**
     * @param {String} message message to send
     * @param {DISCORD.Channel} channel a discord channel
     * @param {{color: String, image: String, thumbnail: String}|String} options embed color
     * @returns {void} void
     * @deprecated Options should be an object, String usage is deprecated
     */

<<<<<<< HEAD
    static send(message, channel, options = {color: null, image: null, thumbnail: null}){
=======
    static send(message, channel, options = {color: null, image: null, title: null, attachment: null}){
>>>>>>> fd5082a754de8c7f242456e30645048e60f2cb1b
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);
        
        // Prevent older uses:
        if(typeof options == "string") options = {color: options, image: null, thumbnail: null};

        // Set default color :
        embed.setColor(COLOR_GREEN);

        // Set options :
        if(options["color"]) embed.setColor(options["color"]);
        if(options["image"]) embed.setImage(options["image"]);
        if(options["thumbnail"]) embed.setThumbnail(options["thumbnail"]);

        return channel.send(embed);
    }
}

module.exports = Embed;

module.exports.COLOR_GREEN = COLOR_GREEN;