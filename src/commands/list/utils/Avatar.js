const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");

class Avatar extends COMMAND {

    constructor(){
        super("avatar", "<user>", "Voir la photo de profil d'une personne");
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