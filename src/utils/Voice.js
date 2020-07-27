const DISCORD = require("discord.js");
const YTDL = require("ytdl-core");

var connections = [];
class Voice {
    /**
     * 
     * @param {DISCORD.VoiceChannel} voiceChannel 
     * @returns {?DISCORD.VoiceConnection} voiceConnection
     */

    static async connect(voiceChannel){
        var connection = null;
        if(voiceChannel instanceof DISCORD.VoiceChannel){
            await voiceChannel.join()
            .then(conn => connection = conn)
            .catch(error => CLIENT.LOGGER.warn(error));
            connections[voiceChannel.guild.id] = voiceChannel;
        }

        return connection;
    }

    /**
     * 
     * @param {DISCORD.VoiceChannel} voiceChannel
     * @returns {void} void
     */

    static disconnect(voiceChannel){
        voiceChannel.leave();
    }

    /**
     * @param {DISCORD.VoiceConnection} connection 
     * @param {String} link youtube link 
     * @param {volume: Number, seek: Number, bitrate: Number} options stream options
     * @returns {void}
     */

    static playYoutube(connection, link, options = {volume: 100, seek: 0, bitrate: 184}){
        connection.play(YTDL(link, options));
    }
}

module.exports = Voice;