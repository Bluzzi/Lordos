const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const COLOR = require("../../../utils/ColorConstants");
const DISCORD = require("discord.js");
const FS = require("fs");
const CANVAS = require("canvas");

const PREFIX = "**<Pendu>** ";

let playingChannels = [];

let sentence = "Vous avez 5 minutes. Go ! Vous devez trouver le mot avant que vous soyez pendu. Tips: Jouer en équipe !";

class Pendu extends COMMAND
{

    constructor()
    {

        super("pendu", "Jouer avec vos amis au pendu contre le bot", "game");

    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message)
    {

        if(!playingChannels[message.guild.id]) playingChannels[message.guild.id] = [];
        
        // Check if the channel is blocked :
        if(playingChannels[message.guild.id].includes(message.channel.id))return EMBED.send("Une partie est déjà en cours dans ce salon.", message.channel);

        // Blocking the living room for the time of the game :
        playingChannels[message.guild.id].push(message.channel.id);

        // Print the 3 2 1 Go :
        let start = ["Début dans 3", "Début dans 2", "Début dans 1", sentence];
        let time = 1000;
        let count = 0;

        EMBED.send(PREFIX + start.shift(), message.channel).then(msg => {
            start.forEach(Element => {
                time += 1000;
                count = count + 1;
                setTimeout(() => {
                    if(count !== start.length) EMBED.edit(msg, PREFIX + start.shift());
                    else EMBED.edit(msg, PREFIX + start.shift()).then(msgs => {

                        // Get all words :
                        let allWords = FS.readFileSync(__dirname + "/../../../../resources/configs/liste_francais.txt", "utf8").split(":");

                        // Shuffle all words :
                        allWords = allWords.sort(() => Math.random() - 0.5); 

                        // Defines the word in a string :
                        let word = "";

                        // Get 1 random word :
                        word = allWords.shift().toLowerCase();

                        // Create an array to divide the word into several characters :
                        let characters = word.split("");

                        console.dir(this.createImage(this.loadText(characters)));
                        msgs.channel.send(this.createImage(this.loadText(characters)));

                        word = "tgm";
                        // Start this game :
                        setTimeout(() => this.starting(msgs, msgs.channel, word, characters), 1000);

                    });
                }, time);
            });
        });
    }

    /**
     * @param {DISCORD.Message} message
     * @param {DISCORD.Channel} channel 
     * @param {string} word
     * @param {array} characters
     */
    starting(message, channel, word, characters)
    {

        // Create an array to register the valid characters :
        let valid_characters = [];

        // Create a variable to add the error :
        let error = 0;

        // Create message collector :
        let collector = channel.createMessageCollector(
            msg => msg.author.id !== MAIN.CLIENT.user.id && 
            (msg.content.toLowerCase() === word || (msg.content.length === 1 && characters.includes(msg.content.toLowerCase()) || msg.content.length >= 1))
        );
        
        setTimeout(() => collector.stop("time", word), 60000 * 5);
        // Check the message :
        collector.on("collect", msg => {
            if(msg && msg.content.length >= 1 && msg.content.split(" ").length === 1){
                if(msg.content.toLowerCase() === word){
                    
                    // Close the collector :
                    collector.stop("end", word);

                    // Send EMBED message for say the winner :
                    EMBED.send("<@" + msg.author.id + "> a gagné !", channel);

                } else if(msg.content.length === 1 && characters.includes(msg.content.toLowerCase())){

                    // Load text : 
                    let load_text = this.loadText(characters, msg.content.toLowerCase(), valid_characters);

                    if(load_text){

                        // Create an Image for Update  the good letter :
                        message.edit(this.createImage(load_text, error, msg.channel, collector));

                    } else {

                        // Close the collector :
                        collector.stop("end", word);

                        // Send EMBED message for say the winner :
                        EMBED.send("<@" + msg.author.id + "> a gagné !", channel);    
                
                    }
                } else {

                    // Update error for set Image of conséquences
                    error = error + 1;

                    // Load text : 
                    let load_text = this.loadText(characters, undefined, valid_characters);

                    // Return Image after error
                    let load_image = this.createImage(load_text, error, msg.channel, collector);

                    // Create an Image for Update the error :
                    if(message.edit(load_image)["name"] === "pendu.png") {

                        message.edit(load_image);

                    } else if(message.edit(load_image)["name"] === "pendu_fail.png") {
                             
                        message.edit(load_image);
                        collector.stop("time", word);

                    }
                }
            }
        });

        // Check this end && if the reason is time EMBED message send else the gamePlayingChannel is unblocked :
        collector.on("end", (collected, reason, word) => {
            if(reason === "time") EMBED.send("Personne n'a gagné ! Le mot etait : " + word, channel);

            // Remove blocking of the channel :
            let index = playingChannels[channel.guild.id].indexOf(channel.id);

            if(index > -1) playingChannels[channel.guild.id].splice(index, 1);
        });
    }

    /**
     * @param {string} text 
     * @param {int | null} error 
     * @param {DISCORD.Channel | null} channel 
     * @param {DISCORD.createMessageCollector | null} collector
     * @returns {DISCORD.MessageAttachment}
     */
    createImage(text, error = null, channel = null, collector = null)
    {

        // Create the image with the dezired size (width, height) :
        let canvas = new CANVAS.Canvas(1750, 1000);

        // Fill the background with white color :
        let background = canvas.getContext("2d");

        background.fillStyle = COLOR.WHITE;
        background.fillRect(0, 0, canvas.width, canvas.height);

        // Add the _ :
        let textContext = canvas.getContext("2d");

        textContext.fillStyle = COLOR.BLACK;
        textContext.font = "75px Arial";

        textContext.fillText(
            text, 
            (canvas.width / 2) + 400 - (textContext.measureText(text).width / 2), 
            (canvas.height / 2) + 200
        );

        if(error && error >= 1){

            let image = new CANVAS.Image();
            image.src = FS.readFileSync(__dirname + "/../../../../resources/images/pendu/pendu_" + error + ".png");
            let baseImage = canvas.getContext("2d");
            baseImage.drawImage(image, (canvas.width / 2) - 600, (canvas.height / 2) - 90, image.width * 2, image.height * 2);

            if(channel && collector && error === 11) {

                return new DISCORD.MessageAttachment(canvas.toBuffer(), "pendu_fail.png");

            }
        } else return new DISCORD.MessageAttachment(canvas.toBuffer(), "pendu.png");
    }

    /**
     * 
     * @param {array} array 
     * @param {string | null} msg 
     * @param {array | null} valid_characters 
     */
    loadText(array, msg = null, valid_characters = null)
    {

        // Create a string to register the count of characters AND :
        let text = "";

        // Set text for converted the count of characters to _ : 
        array.forEach(element => {

            if(valid_characters && valid_characters.includes(element)) text = text + element + " ";
            else if(msg && msg === element){

                text = text + element + " ";
                valid_characters.push(element);

            } else text = text + "_ ";
        });

        // if it returns a string then there is no winner
        if(text.split(" ").includes("_")) return text;
        // else there is a winner
        else return;

    }
}

module.exports = Pendu;