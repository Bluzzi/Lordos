const COMMAND = require("../../Command");
const VOICE = require("../../../music/Voice");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const YOUTUBE = require("../../../music/YouTube");
const COLOR = require("../../../utils/Color");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const SKIP = require("../../../music/Skip");

class Play extends COMMAND {

    constructor(){
        super("play", "Jouer une musique", "music");

        this.setUsage("(url ou nom de la musique)");
        this.setAliases(["p"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let connection = VOICE.getConnection(message.guild);

        // Check if dispatcher is paused :
        if(connection && connection.dispatcher && connection.dispatcher.paused){
            connection.dispatcher.resume();
            return;
        } else {
            if(!args[0]) return false;
        }

        // Check if the member is on a voice channel :
        if(!message.member.voice.channel){
            EMBED.send("Vous devez être dans un salon vocal.", message.channel, {color: COLOR.RED});
            return;
        }

        // Check if the member is on the same channel with the bot :
        if(connection && message.member.voice.channel.id !== connection.channel.id){
            EMBED.send("Vous devez être présent dans le salon ou je me situe actuellement.", message.channel, {color: COLOR.RED});
            return;
        }
        
        // Search youtube musics :
        let videoInfo = await YOUTUBE.searchVideo(args.join(" ")).catch(err => console.log(err));

        // Check if no result :
        if(!videoInfo){
            EMBED.send("Aucune vidéo n'a été trouver !", message.channel, {color: COLOR.RED});
            return;
        }

        // Play or add the music in queue :
        if(VOICE.getConnection(message.guild) && VOICE.getConnection(message.guild).dispatcher){
            EMBED.send(
                "**AJOUTÉE - **[" + videoInfo.title + "](" + videoInfo.url + ")", 
                message.channel,
                {image: videoInfo.thumbnail}
            );

            MUSIC_MANAGER.getInstance(message.guild).addToQueue(videoInfo);
        } else {
            // Play :
            let connection = await VOICE.connect(message.member.voice.channel);

            MUSIC_MANAGER.getInstance(message.guild).play(connection, videoInfo);

            // Send play message :
            EMBED.send(
                "**LECTURE - **[" + videoInfo.title + "](" + videoInfo.url + ")",
                message.channel,
                {image: videoInfo.thumbnail}
            );

            // Start finish checker :
            new SKIP(message.guild, message.channel);
        }
    }
}

module.exports = Play;