const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

const PREFIX = "**<Find the calcul>** ";

let playingChannels = {};

class FindTheCalcul extends COMMAND {

    constructor(){
        super("findthecalcul", "Un jeu de rapidité ou toutes les personnes présentes dans le salon doivent reconstituer le calcul pour atteindre un résultat donné avec des éléments connus.", "game");

        this.setAliases(["ftc"]);
        this.setPermissions([]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
     
    async execute(args, message){/*
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

        setTimeout(() => this.playing(message.channel), 5000);*/
    }

    /*playing(channel){
        let signs = ["-","+","/","*"]
        let calcul = [Math.floor((Math.random() * 10) + 1)]
        for(let i = 0; i < 6; i++){
            if(i % 2 == 0) calcul.push(signs.sort(() => Math.random() - 0.5).shift());
            else calcul.push(Math.floor((Math.random() * 10) + 1));
        }
        console.log(calcul)
        let calcul2 = calcul;
        EMBED.send("Nombre à trouver : " + eval(calcul.join(" ")) + "\nElements : ``" + calcul2.sort(() => Math.random() - 0.5).join("`` ``") + "``", channel);
        console.log(calcul);
        // Create message collector :
        let collector = channel.createMessageCollector(msg => eval(msg.content) == eval(calcul.join(" ")), {time: 60000});

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
    }*/
}

module.exports = FindTheCalcul;