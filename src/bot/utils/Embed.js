const DISCORD = require("discord.js");
const COLOR = require("./ColorConstants");

class Embed {

    /**
     * @param {string} message message to send
     * @param {DISCORD.Channel} channel a discord channel
     * @param {{color: string, image: string, title: string, attachment: DISCORD.MessageAttachment, thumbnail: string, footer: string}} options embed color
     * @returns {DISCORD.Message} 
     */
    static send(message, channel, options = {color: null, image: null, title: null, attachment: null, thumbnail: null}){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);

        // Set default color :
        embed.setColor(COLOR.GREEN);

        // Set options :
        if(options["title"]) embed.setTitle(options["title"]);
        if(options["footer"]) embed.setFooter(options["footer"]);
        if(options["color"]) embed.setColor(options["color"]);
        if(options["image"]) embed.setImage(options["image"]);
        if(options["title"]) embed.setTitle(options["title"]);
        if(options["thumbnail"]) embed.setThumbnail(options["thumbnail"]);

        if(options["attachment"]){
            embed.setImage("attachment://" + options.attachment.name);
            return channel.send({ files: [options.attachment], embed: embed });
        }
        
        return channel.send(embed);
    }

    /**
     * @param {string} message message to send
     * @param {DISCORD.Channel} channel a discord channel
     * @param {{color: string, image: string, title: string, attachment: DISCORD.MessageAttachment, thumbnail: string, footer: string}} options embed color
     * @returns {void} void
     */
    static edit(messageToEdit, message, options = {color: null, image: null, title: null, thumbnail: null}){

        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);

        // Set default color :
        embed.setColor(COLOR.GREEN);

        // Set options :
        if(options["title"]) embed.setTitle(options["title"]);
        if(options["footer"]) embed.setFooter(options["footer"]);
        if(options["color"]) embed.setColor(options["color"]);
        if(options["image"]) embed.setImage(options["image"]);
        if(options["title"]) embed.setTitle(options["title"]);
        if(options["thumbnail"]) embed.setThumbnail(options["thumbnail"]);

        return messageToEdit.edit(embed);
    }
}

module.exports = Embed;