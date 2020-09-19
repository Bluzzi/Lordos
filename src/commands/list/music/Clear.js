const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const EMBED = require("../../../utils/Embed");

class Clear extends COMMAND {

    constructor(){
        super("clear", "Supprime toute les musiques de la queue", "music");

        this.setAliases([""]);
        this.setPermissions([]);
        this.setUsage("");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
     
    async execute(args, message){
        MUSIC_MANAGER.getInstance(message.guild).removeQueue();

        EMBED.send("Vous avez bien supprimer toutes les musiques dans la queue !", message.channel);
    }
}

module.exports = Clear;