const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Avatar extends COMMAND {

    constructor(){
        super("avatar", "Voir la photo de profil d'une personne", "utils");

        this.setUsage("[mention]");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        EMBED.send(
            "", 
            message.channel, 
            {
                "image": message.mentions.users.first() ? 
                    message.mentions.users.first().displayAvatarURL() 
                    : message.author.displayAvatarURL()
            }
        );
    }
}

module.exports = Avatar;