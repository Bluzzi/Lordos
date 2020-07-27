const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const COOL_DISCORD_THINGS = require("../../utils/CoolDiscordThings");

class EmojiAnnonce extends COMMAND {

    constructor(){
        super(
            "emojiannonce", 
            "(votre message)", 
            "Permet d'envoyer une annonce sous forme d'emoji.", 
            [], 
            "ea"
        );
    }
    
    async execute(args, message){
        if(!args[0]) return false;

        EMBED.send(COOL_DISCORD_THINGS.messageToEmoji(args.join(" ")), message.channel);
    }
}

module.exports = EmojiAnnonce;