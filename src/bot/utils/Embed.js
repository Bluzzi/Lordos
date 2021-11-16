const DISCORD = require("discord.js");
const COLOR = require("./ColorConstants");

class Embed {

    /**
     * @param {string} content message to send
     * @param {DISCORD.Channel} channel channel where sent
     * @param {{color: string, image: string, title: string, attachment: DISCORD.MessageAttachment, thumbnail: string, footer: string}} options embed color
     * @returns {DISCORD.Message} 
     */
    static send(content, channel, options = {color: null, image: null, title: null, attachment: null, thumbnail: null}){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(content);

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
        
        return channel.send({embeds: [embed]});
    }
    
    /**
     * @param {string} content message content
     * @param {DISCORD.Message} message message to reply
     * @param {{color: string, image: string, title: string, attachment: DISCORD.MessageAttachment, thumbnail: string, footer: string}} options embed color
     * @returns {DISCORD.Message} 
     */
    static reply(content, message, options = {color: null, image: null, title: null, attachment: null, thumbnail: null}){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(content);

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
            return message.reply({ files: [options.attachment], embed: embed });
        }
        
        return message.reply({embeds: [embed]});
    }

    /**
     * @param {DISCORD.Message} message message to edit
     * @param {string} content message content
     * @param {{color: string, image: string, title: string, attachment: DISCORD.MessageAttachment, thumbnail: string, footer: string}} options embed color
     * @returns {void} void
     */
    static edit(message, content, options = {color: null, image: null, title: null, thumbnail: null}){

        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(content);

        // Set default color :
        embed.setColor(COLOR.GREEN);

        // Set options :
        if(options["title"]) embed.setTitle(options["title"]);
        if(options["footer"]) embed.setFooter(options["footer"]);
        if(options["color"]) embed.setColor(options["color"]);
        if(options["image"]) embed.setImage(options["image"]);
        if(options["title"]) embed.setTitle(options["title"]);
        if(options["thumbnail"]) embed.setThumbnail(options["thumbnail"]);

        return message.edit({embeds: [embed]});
    }
}

module.exports = Embed;