const DISCORD = require("discord.js");
const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const FS = require("fs");
const CANVAS = require("canvas");

let playingChannels = {};

class Precision extends COMMAND {

    constructor(){
        super("precision", "Un jeu de rapidité ou toutes les personnes présentes dans le salon doivent réecrire le plus rapidement possible des séries de mots.", "game");
    }
    
    async execute(args, message){
        if(!playingChannels[message.guild.id]) playingChannels[message.guild.id] = [];
        
        // Check if the channel is blocked :
        if(playingChannels[message.guild.id].includes(message.channel.id)){
            EMBED.send("Une partie est déjà en cours dans ce salon.", message.channel);
            return;
        }

        // Blocking the living room for the time of the game :
        playingChannels[message.guild.id].push(message.channel.id);

        // Read the french words list :
        let allWords = FS.readFileSync(__dirname + "/../../../../resources/configs/liste_francais.txt", "utf8").split(":");

        // Shuffle all words :
        allWords = allWords.sort(() => Math.random() - 0.5); 

        // Get 3 random word per turn :
        let words = [];

        for(let i = 0; i < 3; i++) words.push(allWords.shift());

        // Print the 3 2 1 Go :
        let steps = ["Début dans 3", "Début dans 2", "Début dans 1", "Go ! Vous devez réécrire ces 3 mots le plus rapidement possible :"];
        let time = 1000;

        let embed = new DISCORD.MessageEmbed();

        embed.setColor(EMBED.COLOR_GREEN);
        embed.setDescription(steps.shift());

        message.channel.send(embed).then(msg => {
            steps.forEach(step => {
                time += 1000;

                setTimeout(() => {
                    embed.setDescription(steps.shift());
                    msg.edit(embed);
                }, time);
            });
        });

        setTimeout(() => this.playing(message.channel, words), 5000);
    }

    playing(channel, words){
        let sentence = words.join(" ");

        // Create and send the image with 3 words :
        channel.send(this.createImage(sentence));

        // Create message collector :
        let collector = channel.createMessageCollector(msg => msg.content === sentence, {time: 60000});

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
    
    createImage(text){
        // Create the image with the dezired size (width, height) :
        let canvas = new CANVAS.Canvas(1750, 250);

        // Fill the background with white color :
        let background = canvas.getContext("2d");

        background.fillStyle = "#FFFFFF";
        background.fillRect(0, 0, canvas.width, canvas.height);

        // Add green rectangle in the center :
        let greenRectangle = canvas.getContext("2d");

        greenRectangle.fillStyle = EMBED.COLOR_GREEN;
        greenRectangle.fillRect(25, 25, canvas.width - 50, canvas.height - 50);

        // Add the text :
        let textContext = canvas.getContext("2d");

        textContext.fillStyle = "#FFFFFF";
        
        textContext.font = "100px Arial";

        textContext.fillText(
            text, 
            (canvas.width / 2) - (textContext.measureText(text).width / 2), 
            (canvas.height / 2) + 30
        );
        
        // Return the image :
        return new DISCORD.MessageAttachment(canvas.toBuffer(), "precision.png");
    }
}

module.exports = Precision;