const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const EMBED = require("../../../utils/Embed");
const COLOR = require("../../../utils/ColorConstants");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const VOICE = require("../../../music/Voice");

class Loop extends COMMAND {

    constructor(){
        super("loop", "Permet de jouer la musique en cours en boucle", "music");

        this.setAliases(["repeat"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let musicManager = MUSIC_MANAGER.getInstance(message.guild);

        if(!VOICE.getConnection(message.guild) || !musicManager.nowPlaying){
            EMBED.reply("Le bot ne joue aucune musique actuellement.", message, {color: COLOR.RED});
            return;
        }

        if(message.member.voice.channel && VOICE.getConnection(message.guild).voice.channel.id !== message.member.voice.channel.id){
            EMBED.reply("Vous devez être dans le même salon vocal que le bot pour faire ça.", message, {color: COLOR.RED});
            return;
        }

        if(musicManager.loop){
            EMBED.reply("Vous avez bien désactiver la lecture en boucle !", message);
        } else {
            EMBED.reply("Vous avez bien activer la lecture en boucle !", message);
        }

        musicManager.setLoop(!musicManager.loop);
    }
}

module.exports = Loop;