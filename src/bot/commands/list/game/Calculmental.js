const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

const PREFIX = "**<Calcul mental>** ";

let playingChannels = {};

class Calculmental extends COMMAND {

    constructor(){
        super("calculmental", "Un jeu de rapidité ou toutes les personnes présentes dans le salon doivent donner le résultat d'un calcul.", "game");

        this.setAliases(["cm"]);
        this.setPermissions([]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
     
    async execute(args, message){
        if(!playingChannels[message.guild.id]) playingChannels[message.guild.id] = [];
        
        // Check if the channel is blocked :
        if(playingChannels[message.guild.id].includes(message.channel.id)){
            return EMBED.send(PREFIX + "Une partie est déjà en cours dans ce salon.", message.channel);
        }

        // Blocking the living room for the time of the game :
        playingChannels[message.guild.id].push(message.channel.id);
        module.exports.playingChannels = playingChannels;

        // Print the 3 2 1 Go :
        let steps = ["Début dans 3", "Début dans 2", "Début dans 1", "Go ! Vous devez résoudre le calcul le plus rapidement possible :"];
        let time = 1000;

        EMBED.send(PREFIX + steps.shift(), message.channel).then(msg => {
            steps.forEach(step => {
                time += 1000;

                setTimeout(() => {
                    EMBED.edit(msg,PREFIX + steps.shift());
                }, time);
            });
        });

        setTimeout(() => this.playing(message.channel), 5000);
    }
    

    playing(channel){
        let signs = [" * "," + "," - "]
        let calcul = [];
        for(let i = 0; i < 5; i++){
            if(i % 2 == 0) calcul.push(Math.floor(Math.random() * (20 - 10 + 1)) + 10);
            if(i % 2 != 0) calcul.push(signs.sort(() => Math.random() - 0.5).shift());
        }
        EMBED.send(calcul.join("").replace(/\*/g, "x"), channel);
        
        // Create message collector :
        let collector = channel.createMessageCollector(msg => msg.content == eval(calcul.join("")), {time: 60000});

        // Check for winner :
        collector.on("collect", msg => {
            EMBED.send("<@" + msg.author.id + "> a gagné !", channel);

            // Close the collector :
            collector.stop();
        });

        collector.on("end", (collected, reason) => {
            if(reason === "time") EMBED.send("Personne n'a gagné !", channel);

            // Remove blocking of the channel :
            let index = playingChannels[channel.guild.id].indexOf(channel.id);

            if(index > -1) playingChannels[channel.guild.id].splice(index, 1);
        });
    }
}

module.exports.playingChannels = playingChannels;
module.exports = Calculmental;