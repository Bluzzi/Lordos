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
            EMBED.send("La queue ne contient aucune musique.", message.channel);
            return;
        }

        let messageInformation = "";
        let queuePosition = 1;

        queue.forEach(music => {
            messageInformation += queuePosition + " : " + music.title + "\n\n";

            queuePosition++;
        });

        EMBED.send(
            "```" + messageInformation + "```", 
            message.channel, 
            {title: "Voici les liste des musiques dans la queue"}
        );
    }
}

module.exports = Queue;