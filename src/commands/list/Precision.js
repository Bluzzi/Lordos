const DISCORD = require("discord.js");
const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const PING = require("ping");
const FS = require("fs");
const CANVAS = require("canvas");
const COOL_DISCORD_THINGS = require("../../utils/CoolDiscordThings");

class Precision extends COMMAND {

    constructor(){
        super(
            "precision", 
            "(le nombre de tour que vous allez devoir réecrire, par default : 1)",
            "Un jeu de rapidité ou toutes les personnes présentes dans le salon doivent réecrire le plus rapidement possible des séries de mots.",
            []
        );
    }
    
    async execute(args, message){
        // Read the french words list :
        let allWords = FS.readFileSync(__dirname + "/../../../resources/configs/liste_francais.txt", "utf8").split(":");

        // Set the number of turns :
        let maxTurns = 1;

        if(args[0] && !isNaN(args[0])) maxTurns = args[0];

        // Shuffle all words :
        allWords = allWords.sort(() => Math.random() - 0.5); 

        // Get 3 random word per turn :
        let words = [];

        for(let i = 0; i < (3 * maxTurns); i++) words.push(allWords.shift());

        // Print the 3 2 1 Go :
        let steps = ["Début dans 3", "Début dans 2", "Début dans 1", "Go !"];
        let time = 1000;

        message.channel.send(steps.shift()).then(msg => {
            steps.forEach(step => {
                time += 1000;

                setTimeout(() => msg.edit(steps.shift()), time);
            });
        });

        setTimeout(() => this.playing(args, message, words, maxTurns), 5000);
    }

    playing(args, message, words, maxTurns){
        let turn = 1;

        // Get three words for the current turn :
        let turnWords = [];

        for(let i = 0; i < 3; i++) turnWords.push(words.shift());
        
        // Create and send the image :
        let id = ""
        message.channel.send(this.createImage(turnWords.join(" "), turn)).then((msg) => id = msg.id);
        
        setTimeout(() => {
            let winner = ""
            message.channel.messages.fetch({ after : id}).then(messages => messages.forEach(msg =>{
                let last = ""
                if(msg.content != turnWords.join(" ")){
                    msg.delete();
                }
                else{
                    winner = msg.author
                    if(last != ""){
                        last.delete();
                    }
                    last = msg
                }
            })).then(() => {
                if(winner != ""){
                    EMBED.send("<@" + winner + "> a gagné !", message.channel)
                }
                else{
                    EMBED.send("Personne n'a gagné !", message.channel)
                }
            })
        },20000)
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