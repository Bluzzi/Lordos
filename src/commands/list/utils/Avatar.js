const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");

class Avatar extends COMMAND {

    constructor(){
        super("avatar", "Voir la photo de profil d'une personne", "utils");

        this.setUsage("[mention]");
    }

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