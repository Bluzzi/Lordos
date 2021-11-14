const COMMAND = require("../../Command");
const VOICE = require("../../../music/Voice");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const YOUTUBE = require("../../../music/services/YouTube");
const COLOR = require("../../../utils/ColorConstants");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const SPOTIFY = require("../../../music/services/Spotify");
const DEEZER = require("../../../music/services/Deezer");
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
            connection.dispatcher.resume(); // not work
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
        if(MUSIC_MANAGER.getInstance(message.guild).nowPlaying && connection && message.member.voice.channel.id !== connection.channel.id){
            EMBED.send("Vous devez être présent dans le salon ou je me situe actuellement.", message.channel, {color: COLOR.RED});
            return;
        }
        
        // Search YouTube, Spotify or Deezer musics :
        let search = args.join(" ");

        if(search.includes("open.spotify.com")){
            let videosInfo = await SPOTIFY.getTracksByLink(search);

            videosInfo = videosInfo.map(music => music.artists[0].name + " " + music.name);
            
            this.addOrPlayMusics(videosInfo, message.guild, message.channel, message.member);
        } else if(search.includes("deezer")){
            let videosInfo = await DEEZER.getTracksByLink(search);

            videosInfo = videosInfo.map(music => music.author_name + " " + music.title);

            this.addOrPlayMusics(videosInfo, message.guild, message.channel, message.member);
        } else {
            this.addOrPlayMusics([search], message.guild, message.channel, message.member);
        }
    }

    /**
     * Add or play a music by name
     * @param {string[]} musicsName 
     * @param {DISCORD.Guild} guild
     * @param {DISCORD.Channel} channel
     * @param {DISCORD.GuildMember} member
     */
    async addOrPlayMusics(musicsName, guild, channel, member){
        // If the number of music is greater than 4 then a message is sent to warn that the music is being searched :
        if(musicsName.length > 4) var awaitMessage = await EMBED.send("Recherche des musiques en cours...", channel);

        // Get all music informations :
        let videosInfo = [];

        for(let key in musicsName){
            try {
                videosInfo.push(await YOUTUBE.searchVideo(musicsName[key]));
            } catch {}  
        }

        // Check if no music is find :
        if(videosInfo.length === 0){
            EMBED.send("Aucune vidéo n'a été trouvée !", channel, {color: COLOR.RED});
            return;
        }

        // Add to queue or play the song :
        let addedToQueue = [];
        let played;

        for(let key in videosInfo){
            if(VOICE.getConnection(guild) && VOICE.getConnection(guild).dispatcher && MUSIC_MANAGER.getInstance(guild).nowPlaying){
                // Add to queue :
                MUSIC_MANAGER.getInstance(guild).addToQueue(videosInfo[key]);
    
                addedToQueue.push(videosInfo[key]);
            } else {
                // Play :
                let connection = await VOICE.connect(member.voice.channel);
    
                MUSIC_MANAGER.getInstance(guild).play(connection, videosInfo[key]);

                played = videosInfo[key];
    
                // Start finish checker :
                new SKIP(guild, channel);
            }
        }

        // Send confirmation message :
        if(played){
            EMBED.send(
                "**LECTURE - **[" + played.title + "](" + played.url + ")",
                channel, {image: played.thumbnail}
            );
        }

        if(addedToQueue.length > 0){
            if(addedToQueue.length === 1){
                EMBED.send("**AJOUTÉE - **[" + addedToQueue[0].title + "](" + addedToQueue[0].url + ")", channel);
            } else {
                EMBED.send("**AJOUTÉE - **" + addedToQueue.length + " titres ont été ajouté à la queue !", channel);
            }
        }  
        
        // Remove await message :
        if(awaitMessage) awaitMessage.delete();
    }
}

module.exports = Play;