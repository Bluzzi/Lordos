const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const VOICE = require("../../../music/Voice");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const EMBED = require("../../../utils/Embed");

class Stop extends COMMAND {

    constructor(){
        super("stop", "Arreter la lecture de la musique en cours", "music");

        this.setAliases(["s"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        MUSIC_MANAGER.getInstance(message.guild).removeQueue();
        VOICE.getConnection(message.guild).disconnect();

        EMBED.send("Vous avez bien stopper la musique en cours de lecture !");
    }
}

module.exports = Stop;