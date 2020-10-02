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
        MUSIC_MANAGER.getInstance(message.guild).removePlayed();
        
        let connection = VOICE.getConnection(message.guild);

        if(connection){
            EMBED.send("Vous avez bien stopper la musique en cours de lecture !", message.channel);
            
            connection.disconnect();
        } else {
            EMBED.send("Le bot ne joue aucune musique !");
        }
    }
}

module.exports = Stop;