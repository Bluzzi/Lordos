const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const EMBED = require("../../../utils/Embed");

class Log extends COMMAND {

    constructor(){
        super("log", "Log a message into your privates messages.", "utils");

        this.setUsage("<message link> (il se peut que je ne puisse pas accéder au message, ou que le message n'existe pas.)")
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let returnFalse = false;
        if(!args[0])return false;

        let link = args[0].split("/");
        let channelID = link[link.length - 2];
        await BOT.CLIENT.channels.fetch(channelID).then((channel) => {
            channel.messages.fetch(link[link.length - 1]).then((msg) => {
                // Get datas :
                let author = msg.author.username + "#" + msg.author.discriminator; // author name
                let serverName = msg.guild.name; // server name
                let date = message.createdAt; // message date
                let hour = date.getHours() + ":" + date.getMinutes(); // message hours
                date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                let content = "\n" + msg.content // text content

                // Get attachments :
                let attachments = []
                for(let attachment of msg.attachments) attachments.push(attachment);
                // Get embeds :
                let embeds = []
                for(let embed of msg.embeds) embeds.push(embed);
    
                // Send log :
                message.author.send("> **" + author + 
                                    "**, le " + date + 
                                    " à " + hour +
                                    " a envoyé dans __" + serverName + "__" + content, ...embeds, ...attachments);
            }).catch((error)=>{
                returnFalse = true;
            })
        }).catch((error)=>{
            returnFalse = true;
        })

        if(returnFalse)return false;
    }
}

module.exports = Log;