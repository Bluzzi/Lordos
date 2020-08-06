const DISCORD = require("discord.js");
const YTDL = require("ytdl-core");

/** @type {DISCORD.VoiceConnection[]} */
var connections = [];

class Voice {
    
    /**
     * Connect the bot in a voice channel
     * @param {DISCORD.VoiceChannel} voiceChannel 
     * @returns {?DISCORD.VoiceConnection} voiceConnection
     */
    static async connect(voiceChannel){
        var connection = null;

        if(voiceChannel instanceof DISCORD.VoiceChannel){
            await voiceChannel.join().then(conn => connection = conn).catch(error => MAIN.LOGGER.warn(error));
            
            connections[voiceChannel.guild.id] = connection;
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
     * @param {String} link youtube link 
     * @param {volume: int, seek: int, bitrate: int} options stream options
     */
    static playYoutube(connection, link, options = {}){
        connection.play(YTDL(link, options), options);
    }
}

module.exports = Voice;