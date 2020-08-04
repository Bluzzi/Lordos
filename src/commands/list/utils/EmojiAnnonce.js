const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const COOL_DISCORD_THINGS = require("../../../utils/CoolDiscordThings");

class EmojiAnnonce extends COMMAND {

    constructor(){
        super("emojiannonce", "Envoie une annonce sous forme d'emoji", "utils");

        this.setAliases(['ea']);
        this.setUsage("<texte>");
    }
    
    async execute(args, message){
        if(!args[0]) return false;

        // Get the annonce content :
        let annonce = args.join(" ");

        // Remove and save all mentions from the annonce :
        let mentions = [];

        while(COOL_DISCORD_THINGS.getMemberIdFromStringMention(annonce)){
            let currentMention = COOL_DISCORD_THINGS.getMemberIdFromStringMention(annonce);

            annonce = annonce.replace("<@!" + currentMention + ">", "{}");

            mentions.push(currentMention);
        }

        // Replace annonce char by emoji :
        annonce = COOL_DISCORD_THINGS.messageToEmoji(annonce);

        // Add the saved mention to the message :
        mentions.forEach(mention => annonce = annonce.replace("**{** **}**", "<@!" + mention + ">"));

        // Remove the command message :
        message.delete();

        // Send annonce :
        EMBED.send(annonce, message.channel);
    }
}

module.exports = EmojiAnnonce;