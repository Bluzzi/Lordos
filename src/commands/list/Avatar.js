const COMMAND = require("../Command");
const DISCORD = require("discord.js");
const EMBED = require("../../utils/Embed");

class Avatar extends COMMAND {

    constructor() {
        super("avatar");
    }

    async execute(args, message){
        let mentions = message.mentions;
        
        let image;

        console.log(mentions)
        if(!mentions.users.first()){ 
            image = message.author.displayAvatarURL();
        }
        else{
            image = mentions.users.first().displayAvatarURL();
        }

        EMBED.send("", message.channel, {"image" : image})
    }
}

module.exports = Avatar;