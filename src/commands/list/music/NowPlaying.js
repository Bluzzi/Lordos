const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const EMBED = require("../../../utils/Embed");

class NowPlaying extends COMMAND {

    constructor(){
        super("nowplaying", "Permet de voir le nom de la musique actuellement jouer", "music");

        this.setAliases(["np"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let musicInfo = MUSIC_MANAGER.getInstance(message.guild).nowPlaying;

        if(musicInfo){
            EMBED.send(
                "**EN LECTURE - **[" + musicInfo.title + "](" + musicInfo.url + ")",
                message.channel
            );
        } else {
            EMBED.send("Aucune musique n'es actuellement jouer.", message.channel);
        }
    }
}

module.exports = NowPlaying;