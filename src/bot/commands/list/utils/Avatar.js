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
        let user = args[0] && message.mentions.users.first() ? 
            message.mentions.users.first() : message.author;

        EMBED.reply(
            "Voici l'avatar de <@" + user.id + "> :", message,
            {
                image: user.displayAvatarURL()
            }
        );
    }
}

module.exports = Avatar;