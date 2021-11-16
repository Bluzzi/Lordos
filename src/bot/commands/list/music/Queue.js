const COMMAND = require("../../Command");
const MUSIC_MANAGER = require("../../../music/MusicManager");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Queue extends COMMAND {

    constructor(){
        super("queue", "Affiche la queue", "music");

        this.setAliases(["q"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let queue = MUSIC_MANAGER.getInstance(message.guild).queue;

        if(!queue.length){
            EMBED.reply("La queue ne contient aucune musique.", message);
            return;
        }

        let messageInformation = "";
        let queuePosition = 1;

        queue.slice(0, 10).forEach(music => {
            messageInformation += queuePosition + " : " + music.title + "\n\n";

            queuePosition++;
        });

        if(queuePosition >= 10 && queue.slice(10).length > 0){
            messageInformation += "... et " + queue.slice(10).length + " titres"; 
        }

        EMBED.reply(
            "```" + messageInformation + "```", 
            message, 
            {title: "Voici les liste des musiques dans la queue"}
        );
    }
}

module.exports = Queue;