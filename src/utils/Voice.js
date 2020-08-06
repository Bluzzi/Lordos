const DISCORD = require("discord.js");
const YTDL = require("ytdl-core");

let queue = {};
let nowPlaying = {};

class Voice {
    
    /**
     * Connect the bot in a voice channel
     * @param {DISCORD.VoiceChannel} voiceChannel 
     * @returns {?DISCORD.VoiceConnection} voiceConnection
     */
    static async connect(voiceChannel){
        var connection = null;

        if(voiceChannel instanceof DISCORD.VoiceChannel){
            await voiceChannel.join().then(conn => connection = conn).catch(error => CLIENT.LOGGER.warn(error));
        }

        return connection;
    }

    /**
     * Leave a voice channel
     * @param {DISCORD.VoiceChannel} voiceChannel
     */
    static disconnect(voiceChannel){
        voiceChannel.leave();
    }

    /**
     * Play a youtube music in a voice channel
     * @param {DISCORD.VoiceConnection} connection 
     * @param {string} link youtube link 
     * @param {Object} videoInfo
     * @param {volume: int, seek: int, bitrate: int} options stream options
     * @returns {DISCORD.StreamDispatcher}
     */
    static playYoutube(connection, link, videoInfo = {}, options = {}){
        nowPlaying[connection.channel.guild.id] = videoInfo;

        return connection.play(YTDL(link, options), options);
    }

    /**
     * Get the connection in a guild
     * @param {DISCORD.Guild} guild
     * @returns {?DISCORD.VoiceConnection}
     */
    static getConnection(guild){
        return this.getConnections().filter(voiceConnection => voiceConnection.channel.guild.id === guild.id).first();
    }

    /**
     * Get all connections
     * @returns {DISCORD.Collection<string, DISCORD.VoiceConnection>}
     */
    static getConnections(){
        return CLIENT.voice.connections;
    }

    /**
     * Get information about the played video
     * @param {DISCORD.Guild} guild 
     * @returns {?Object}
     */
    static getVideoPlayed(guild){
        return nowPlaying[guild.id];
    }

    /**
     * @param {DISCORD.Guild} guild 
     * @returns {object[]}
     */
    static getQueue(guild){
        if(!queue[guild.id]) queue[guild.id] = [];

        return queue[guild.id];
    }

    /**
     * @param {DISCORD.Guild} guild 
     * @param {Object} videoInfo 
     */
    static addToQueue(guild, videoInfo){
        if(!queue[guild.id]) queue[guild.id] = [];

        queue[guild.id].push(videoInfo);
    }

    /**
     * 
     * @param {DISCORD.Guild} guild 
     * @param {string} videoId 
     */
    static removeFromQueue(guild, videoId){
        if(queue[guild.id]){
            for(let key in queue[guild.id]){
                if(queue[guild.id][key].id === videoId) delete queue[guild.id][key];
            }
        }
    }
}

module.exports = Voice;