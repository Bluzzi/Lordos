const DISCORD = require("discord.js");
const YTDL = require("ytdl-core");

let instances = {};

class MusicManager {

    #queue;
    #nowPlaying;
    #loop;

    /**
     * @param {DISCORD.Guild}
     */
    constructor(guild){
        instances[guild.id] = this;

        this.#queue = [];
        this.#nowPlaying = {};
        this.#loop = false;
    }

    /**
     * Get the MusicManager instance of the guild
     * @param {DISCORD.Guild}
     * @returns {MusicManager}
     */
    static getInstance(guild){
        if(!instances[guild.id]) new MusicManager(guild);
        
        return instances[guild.id];
    }

    /**
     * Play a youtube music in a voice channel
     * @param {DISCORD.VoiceConnection} connection 
     * @param {{type: string, title: string, description: string, url: string, videoId: string, duration: {}}} videoInfo  
     * @param {volume: int, seek: int, bitrate: int} options stream options
     * @returns {DISCORD.StreamDispatcher}
     */
    play(connection, videoInfo = {}, options = {}){
        this.#nowPlaying = videoInfo;

        return connection.play(YTDL(videoInfo.url, options), options);
    }

    /**
     * @param {{type: string, title: string, description: string, url: string, videoId: string, duration: {}}} videoInfo 
     */
    addToQueue(videoInfo){
        this.#queue.push(videoInfo);
    }

    /**
     * @param {int} index
     * @returns {{type: string, title: string, description: string, url: string, videoId: string, duration: {}}}
     */
    removeFromQueue(index){
        return this.#queue.splice(index, 1);
    }

    removeQueue(){
        this.#queue = [];
    }

    /**
     * @returns {Object[{type: string, title: string, description: string, url: string, videoId: string, duration: {}}]}
     */
    get queue(){
        return this.#queue;
    }

    /**
     * @returns {{type: string, title: string, description: string, url: string, videoId: string, duration: {}}}
     */
    get nowPlaying(){
        return this.#nowPlaying;
    }

    /**
     * @returns {bool}
     */
    get loop(){
        return this.#loop;
    }
}

module.exports = MusicManager;