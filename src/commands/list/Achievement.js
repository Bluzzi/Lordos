const COMMAND = require("../Command");
const CANVAS = require("canvas");
const DISCORD = require("discord.js");
const FS = require("fs");
const EMBED = require("../../utils/Embed");

CANVAS.registerFont(__dirname + "/../../../resources/fonts/minecraftia.ttf", {family: "Minecraftia"});

const CHARACTER_LIMIT = 30;

class Achievement extends COMMAND {
    
    constructor(){
        super(
            "achievement",
            "(texte)",
            "Affiche une achievement Minecraft personnalisé"
        );
    }

    async execute(args, message){
        if(!args[0]) return false;

        let text = args.join(" ");

        if(text.length > CHARACTER_LIMIT){
            EMBED.send("Votre texte ne peux pas faire plus de " + CHARACTER_LIMIT + " caractères !", message.channel);
            return;
        }

        message.channel.send(text.length);
        message.channel.send(this.createImage(text));
    }

    createImage(text){
        // Get the base image from file :
        let image = new CANVAS.Image();

        image.src = FS.readFileSync(__dirname + "/../../../resources/images/achievement.png");

        // Create the canvas with the same size of the base image :
        let canvas = new CANVAS.Canvas(image.width, image.height);

        // Add the base image in the canvas :
        let baseImage = canvas.getContext("2d");

        baseImage.drawImage(image, 0, 0, image.width, image.height);

        // Add the text :
        let pixel = text.length > 18 ? 10 : 16;
        console.log(pixel);

        let textContext = canvas.getContext("2d");

        textContext.fillStyle = "#FFFFFF";
        textContext.font = pixel + "px Minecraftia";

        textContext.fillText(text, 59, (canvas.height / 2) + 15);

        // Return final image in MessageAttachment instance :
        return new DISCORD.MessageAttachment(canvas.toBuffer(), "achievement.png");
    };
}

module.exports = Achievement;