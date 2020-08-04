/*
COMMANDE EN PAUSE
*/








const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const CONSTANTS = require("../../../utils/Constants");
const Embed = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const CANVAS = require("canvas");

let help = [
    "__**Pokemon card**__",
    "-types: fire, water, grass, fairy, dark, fighting, lighting, psy, basic, team",
    "-options: name, attack_name, attack_description, story, avatar",
    "\n**Exemple:**",
    ">cards fire\nname:BOB\nattack_description\n<@"+ 733819345905516656 + ">"
]

class Cards extends COMMAND {

    constructor(){
        super("cards", "Créé une carte pokémon customiser", "meme");

        this.setUsage("<help ou type>");
    }

    async execute(args, message){
        args = args.join(" ").split("\n");
        console.log(args)

        if(args[0] == "help"){
            EMBED.send(help.join("\n"), message.channel);
            return;
        }
        if(!args[0] || !["fire","team","water","psy","lightning","grass","fairy","dark","basic","fighting"].includes(args[0])){
            EMBED.send(this.getUsage(), message.channel);
            return;
        }
        
        
        //this.createImage(args, message);
        this.createImage(args, message);
    }



    async createImage(args, message){
        console.log(args)

        // Create canvas :
        const canvas = CANVAS.createCanvas(270, 380);
        const ctx = canvas.getContext('2d');

        // Add avatar :
        let avatar = await CANVAS.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 40, 220, 150);

        // Add card :
        let path = "/../../../resources/images/pokemon/" + args[0] + ".png";
        let image = await CANVAS.loadImage(__dirname + path);
        ctx.drawImage(image, 0, 0, 270, 380);

        // Add Lordos avatar :
        path = "/../../../resources/images/lordos_avatar_circle.png";
        image = await CANVAS.loadImage(__dirname + path);
        ctx.drawImage(image, 14, 25, 33, 33);

        // Add name :
        let textContext = canvas.getContext("2d");
        textContext.fillStyle = "#000000";
        textContext.font = "15px Arial";
        
        if(ctx.measureText(args[1]).width > 117){
            EMBED.send("Le nom du pokemon est trop long.", message.channel);
            return;
        }

        textContext.fillText(args[1], 65, 28);

        //Add attack name :
        textContext = canvas.getContext("2d");

        textContext.fillStyle = "#000000";
        textContext.font = "15px Arial";
        
        if(ctx.measureText(args[2]).width > 200){
            EMBED.send("Le nom du pokemon est trop long.", message.channel);
            return;
        }

        textContext.fillText(args[2], 30, 220);

         //Add attack's description :
         textContext = canvas.getContext("2d");

         textContext.fillStyle = "#000000";
         textContext.font = "15px Arial";
         
         if(ctx.measureText(args[3]).width > 200){
             EMBED.send("La description de l'attaque est trop longue.", message.channel);
             return;
         }

         textContext.fillText(args[3], 30, 240);


        // Send the message :
        const attachment = new DISCORD.MessageAttachment(canvas.toBuffer(), 'card.png');
        message.channel.send(attachment);
    }

    getOption(option, args){
        let regex = new RegExp(option + ".*:.*?");
        if(args.match(regex)){
            args = args.split(":");
            return args[1];
        }
        else{
            return false;
        }
    }
}

module.exports = Cards;