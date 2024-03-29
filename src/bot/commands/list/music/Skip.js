const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const VOICE = require("../../../music/Voice");
const EMBED = require("../../../utils/Embed");
const COLOR = require("../../../utils/ColorConstants");

class Skip extends COMMAND {

    constructor(){
        super("skip", "Passe à la musique suivante de la queue", "music");

        this.setAliases(["s"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!VOICE.getConnection(message.guild)){
            EMBED.reply("Le bot ne joue aucune musique actuellement.", message, {color: COLOR.RED});
            return;
        }

        if(message.member.voice.channel.id !== VOICE.getConnection(message.guild).voice.channel.id){
            EMBED.reply("Vous devez être dans le même salon que le bot.", message, {color: COLOR.RED});
            return;
        }
        
        if(!MUSIC_MANAGER.getInstance(message.guild).queue[0]){
            EMBED.reply("Il n'y a plus de musique dans la queue.", message, {color: COLOR.RED});
            return;
        }

        // Get the next song and remove it from the queue :
        let nextSong = MUSIC_MANAGER.getInstance(message.guild).removeFromQueue(0);

        // Play the next song :
        MUSIC_MANAGER.getInstance(message.guild).play(VOICE.getConnection(message.guild), nextSong);

        // Information :
        EMBED.reply(
            "**LECTURE - **[" + nextSong.title + "](" + nextSong.url + ")",
            message,
            {image: nextSong.thumbnail}
        );
    }
}

module.exports = Skip;