const DISCORD = require("discord.js");

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
        return MAIN.CLIENT.voice.connections;
    }
}

module.exports = Voice;