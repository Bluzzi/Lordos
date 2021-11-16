const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const EMBED = require("../../../utils/Embed");

class Clear extends COMMAND {

    constructor(){
        super("clear", "Supprime toute les musiques de la queue", "music");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
     
    async execute(args, message){
        MUSIC_MANAGER.getInstance(message.guild).removeQueue();

        EMBED.reply("Vous avez bien supprimé toutes les musiques dans la queue !", message);
    }
}

module.exports = Clear;