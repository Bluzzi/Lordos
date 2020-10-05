const DISCORD = require("discord.js");
const MUSIC_MANAGER = require("./MusicManager");
const VOICE = require("./Voice");
const EMBED = require("../utils/Embed");

class Skip {

    /**
     * @param {DISCORD.Guild} guild 
     * @param {DISCORD.Channel} channel
     */
    constructor(guild, channel){
        VOICE.getConnection(guild).dispatcher.on("finish", (info) => {
            // Check if a next song exist :
            if(MUSIC_MANAGER.getInstance(guild).queue.length === 0 && !MUSIC_MANAGER.getInstance(guild).loop){
                MUSIC_MANAGER.getInstance(guild).removePlayed();
                return;
            }

            // Play the next song :
            let nextSong;

            if(MUSIC_MANAGER.getInstance(guild).loop){
                nextSong = MUSIC_MANAGER.getInstance(guild).nowPlaying;
            } else {
                nextSong = MUSIC_MANAGER.getInstance(guild).removeFromQueue(0);
            }

            MUSIC_MANAGER.getInstance(guild).play(VOICE.getConnection(guild), nextSong);

            EMBED.send(
                "**LECTURE - **[" + nextSong.title + "](" + nextSong.url + ")",
                channel,
                {image: nextSong.thumbnail}
            );

            // Restart finish checker :
            new Skip(guild, channel);
        });
    }
}

module.exports = Skip;