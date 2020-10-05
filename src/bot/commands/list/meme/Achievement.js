const COMMAND = require("../../Command");
const CANVAS = require("canvas");
const DISCORD = require("discord.js");
const FS = require("fs");
const EMBED = require("../../../utils/Embed");
const PATH = require("path");

CANVAS.registerFont(PATH.normalize(__dirname + "/../../../../../resources/fonts/minecraftia.ttf"), {family: "Minecraftia"});

const CHARACTER_LIMIT = 28;

class Achievement extends COMMAND {
    
    constructor(){
        super("achievement", "Affiche un achivement Minecraft personnalisé", "meme");

        this.setUsage("<texte>");
    }
    
    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;

        let text = args.join(" ");

        if(text.length > CHARACTER_LIMIT){
            EMBED.send("Votre texte ne peux pas faire plus de " + CHARACTER_LIMIT + " caractères !", message.channel);
            return;
        }

        message.channel.send(this.createImage(text));
    }

    createImage(text){
        // Get the base image from file :
        let image = new CANVAS.Image();

        image.src = FS.readFileSync(__dirname + "/../../../../resources/images/achievement.png");

        // Create the canvas with the same size of the base image :
        let canvas = new CANVAS.Canvas(image.width, image.height);

        // Add the base image in the canvas :
        let baseImage = canvas.getContext("2d");

        baseImage.drawImage(image, 0, 0, image.width, image.height);

        // Add the text :
        let textContext = canvas.getContext("2d");

        let pixel = text.length > 18 ? 13 : 16;

        textContext.font = pixel + "px Minecraftia";
        textContext.fillStyle = "#FFFFFF";

        textContext.fillText(text, 59, (canvas.height / 2) + 15);

        // Return final image in MessageAttachment instance :
        return new DISCORD.MessageAttachment(canvas.toBuffer(), "achievement.png");
    };
}

module.exports = Achievement;