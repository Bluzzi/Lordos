const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const EMBED = require("../../../utils/Embed");

class Shuffle extends COMMAND {

    constructor(){
        super("shuffle", "Mélange la queue", "music");

        this.setAliases(["shuff"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let musicManager = MUSIC_MANAGER.getInstance(message.guild);
        musicManager.shuffleQueue();

        EMBED.reply("Vous avez bien mélangé la queue !", message);
    }
}

module.exports = Shuffle;