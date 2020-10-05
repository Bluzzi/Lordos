/*
COMMANDE EN PAUSE
*/



const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const CANVAS = require("canvas");

let help = [
    "__**Pokemon card**__",
    "-types: fire, water, grass, fairy, dark, fighting, lighting, psy, basic, team",
    "\n__Exemple :__",
    ">cards fire",
    "Loupio......[this is the name]",
    "@Lordos#6371......[this is the discord's user avatar to display]",
    "Eating......[this is the attack's name]",
    "Attack the opponent, then eat his brain.......[this is the attack's description] ",
    "\n\nIf you want to ignore just go to the line and write nothing (ignore the image will show your avatar)"
]

class Cards extends COMMAND {

    constructor(){
        super("cards", "Créé une carte pokémon customiser", "meme");

        this.setUsage("<help ou type>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        // Split the args as card's parameters :
        args = args.join(" ").split("\n");

        // Send help :
        if(args[0] == "help") return EMBED.send(help, message.channel);

        // Verify args[0] and type :
        if(!args[0] || !["fire","team","water","psy","lightning","grass","fairy","dark","basic","fighting"].includes(args[0])) return false;
        
        //this.createImage(args, message);
        this.createImage(args, message);
    }

    // Main function, create the card and send it :
    async createImage(args, message){

        // Set "" if parameter is undefined :
        for(let i = 0; i < 6; i++) args[i] = (args[i] == undefined) ? "" : args[i];

        // Create canvas :
        const canvas = CANVAS.createCanvas(270, 380);
        const ctx = canvas.getContext('2d');

        // Add avatar :
        let avatar = (args[2] == "") ? message.author : message.mentions.users.first();
        avatar = await CANVAS.loadImage(avatar.displayAvatarURL({format : "jpg"}));
        ctx.drawImage(avatar, 25, 40, 220, 150);

        // Add card :
        let path = "/../../../../resources/images/pokemon/" + args[0] + ".png";
        let image = await CANVAS.loadImage(__dirname + path);
        ctx.drawImage(image, 0, 0, 270, 380);

        // Add Lordos avatar :
        path = "/../../../../resources/images/new-royaume-logo-circle.png";
        image = await CANVAS.loadImage(__dirname + path);
        ctx.drawImage(image, 14, 25, 33, 33);

        // Add name :
        let textContext = canvas.getContext("2d");
        textContext.fillStyle = "#000000";
        textContext.font = "17px Arial";
        
        if(ctx.measureText(args[1]).width > 117){
            EMBED.send("Le nom du pokemon est trop long.", message.channel);
            return;
        }

        textContext.fillText(args[1], 67, 28);

        // Add attack name :
        textContext = canvas.getContext("2d");

        textContext.fillStyle = "#000000";
        textContext.font = "18px Arial";
        
        if(ctx.measureText(args[3]).width > 200){
            EMBED.send("Le nom du pokemon est trop long.", message.channel);
            return;
        }

        textContext.fillText(args[3], 30, 220);

         // Add attack's description :
         textContext = canvas.getContext("2d");

         textContext.fillStyle = "#000000";
         textContext.font = "12px Arial";
         
         if(ctx.measureText(args[4]).width > 680){
             return EMBED.send("La description de l'attaque est trop longue.", message.channel);
         }
         
         let text = []
         let line = "";
         for(let i of args[4].split(" ")){
             line += i + " ";
             if(ctx.measureText(line).width > 170){
                 text.push(line)
                 line = "";
             }
         }
         text.push(line);

         text.forEach((txt)=>{
            textContext.fillText(txt, 30, 240 + 20 * text.indexOf(txt));
         })


        // Send the message :
        const attachment = new DISCORD.MessageAttachment(canvas.toBuffer(), 'card.png');
        message.channel.send(attachment);
    }
}

module.exports = Cards;