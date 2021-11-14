const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const VOICE = require("../../../music/Voice");
const EMBED = require("../../../utils/Embed");

class Pause extends COMMAND {

    constructor(){
        super("pause", "Permet de mettre en pause la musique", "music");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let connection = VOICE.getConnection(message.guild);

        if(connection && connection.dispatcher){
            connection.dispatcher.pause(true);
            EMBED.send("Musique mis en pause.", message.channel)
        }
    }
}

module.exports = Pause;