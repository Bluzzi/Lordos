const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const VOICE = require("../../../music/Voice");
const EMBED = require("../../../utils/Embed");
const FUNCTION_PLUS = require("../../../utils/FunctionPlus");

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
        let dispatcher = VOICE.getConnection(message.guild).dispatcher;

        if(musicInfo && dispatcher){
            // Play or pause indicator :
            let timeFormatted = dispatcher.paused ? "⏸️ " : "▶️ ";

            let timePlayed = dispatcher.totalStreamTime - dispatcher.pausedTime;
            let musicDuration =  musicInfo.duration.seconds * 1000;

            // Duration bar :
            for(let i = 1; i <= 20; i++){
                let percent = Math.round(timePlayed / musicDuration * 20);

                if(percent === i) timeFormatted += "🔵";
                else if(percent > i) timeFormatted += "▬";
                else if(percent < i) timeFormatted += "➖";
            }

            timeFormatted += " ";

            // Duration time :
            timePlayed = FUNCTION_PLUS.convertMS(timePlayed);
            musicDuration =  FUNCTION_PLUS.convertMS(musicDuration);

            if(timePlayed.hour > 0) timeFormatted += timePlayed.hour + "h ";
            if(timePlayed.minute > 0) timeFormatted += timePlayed.minute + "m ";
            timeFormatted += timePlayed.second + "s ";

            timeFormatted += "/ ";

            if(musicDuration.hour > 0) timeFormatted += musicDuration.hour + "h ";
            timeFormatted += musicDuration.minute + "m ";
            timeFormatted += musicDuration.second + "s ";

            EMBED.send(
                "**EN LECTURE - **[" + musicInfo.title + "](" + musicInfo.url + ")\n\n" + timeFormatted,
                message.channel
            );
        } else {
            EMBED.send("Aucune musique n'es actuellement jouer.", message.channel);
        }
    }
}

module.exports = NowPlaying;