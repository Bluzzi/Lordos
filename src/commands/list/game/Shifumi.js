const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const CANVAS = require("canvas");
const DISCORD = require("discord.js");

const PREFIX = "**<Shifumi> **";

const EMOJIS = ["✌️", "🤚", "👊"];

class Shifumi extends COMMAND {

    constructor(){
        super("shifumi", "Jouer au shifumi contre le bot", "game");
    }

    execute(args, message){
        // Verify if args[0] is a number or not :
        if(isNaN(args[0])) return false;

        // Send the start message, then start :
        let file = new DISCORD.MessageAttachment(__dirname + "/../../../resources/images/shifumi/shifumi.png", "shifumi.png");
        
        EMBED.send(
            "<@" + message.author.id + "> a commencé un shifumi contre Lordos !",
            message.channel, 
            {attachment: file, title: PREFIX}
        ).then((msg) => this.newRound(msg, message, [0, 0], args[0]));
    }

    // Play round funcion :
    newRound(msg, message, score, rounds){
        // Decrease one to total round :
        rounds -= 1;

        // Add reactions :
        for(let i of EMOJIS) msg.react(i);

        // Create collector :
        let collector = msg.createReactionCollector((reac, user) => user.id === message.author.id, {time: 60000});

        collector.on("collect", (reaction, user) => {
            collector.stop();

            // Set up tools in variables :
            let playerTool = EMOJIS.indexOf(reaction.emoji.name);
            let botTool = Math.floor(Math.random() * 2);

            // Get the round winner and create a text :
            let text = PREFIX;

            switch(this.getWinner(playerTool, botTool)){
                case 0:
                    text += "Pas de vainqueur à cette manche !";
                break;
                
                case 1:
                    text += "Un point de plus pour <@!" + user.id + "> !";

                    score[0] += 1;
                break;
                
                case 2:
                    text += "Un point de plus pour <@!" + CLIENT.user.id + ">";

                    score[1] += 1;
                break;
            }

            text += "\n\n**" + user.username + "** : " + score[0] + "\n**Lordos** : " + score[1];

            // Show the image :
            this.createImage(playerTool, botTool).then((image) => {
                // Verify if round was the last or not :
                if(rounds > 0){
                    // Send image, then start a new round :
                    EMBED.send(text, message.channel, {attachment: image}).then((msg)=> this.newRound(msg, message, score, rounds));
                } else {
                    // Send image, then send ending message :
                    EMBED.send(text, message.channel, {attachment: image}).then(() => {
                        text = "La partie est finie !\n\n__Score final :__\n\n**" 
                        + user.username + "** : " + score[0] + "\n**Lordos** : " 
                        + score[1] + this.getFinalWinner(score, user);

                        EMBED.send(text, message.channel);
                    })
                }
            })
        });

        // If collector timeout :
        collector.on("end", (collected, reason) => {
            if(reason !== "user"){
                let newEmbd = new DISCORD.MessageEmbed().setDescription(PREFIX + "\n```yaml\nPartie expirée.```");

                msg.edit(newEmbd);
            }
        });
    }

    // Create the image with the two tools, return an attachment :
    async createImage(playerTool, botTool){
        let tools = ["ciseaux", "feuille", "pierre"];

        // Create canvas and context :
        const canvas = CANVAS.createCanvas(350, 200);

        const ctx = canvas.getContext("2d");

        // Set the background color :
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fill(); 

        // Add player and bot choice :
        let players = {
            0: {
                choice: playerTool,
                width: 25,
                height: 25
            },
            1: {
                choice: botTool,
                width: 175,
                height: 25
            }
        };

        for(let [key, info] of Object.entries(players)){
            let image = await CANVAS.loadImage(__dirname + "/../../../resources/images/shifumi/" + tools[info.choice] + (key == 1 ? "2" : "") + ".png");

            if(key == 1) /* TODO : good rotate */;

            ctx.drawImage(image, info.width, info.height);
        }

        // Send the message :
        return new DISCORD.MessageAttachment(canvas.toBuffer(), "test.png");
    }


    // Tell wich of the player won the round :
    getWinner(playerTool, botTool){
        if(playerTool == botTool) return 0;

        if((playerTool == 0 & botTool == 1) | (playerTool == 1 & botTool == 2) | (playerTool == 2 & botTool == 0)) return 1;

        if((botTool == 0 & playerTool == 1) | (botTool == 1 & playerTool == 2) | (botTool == 2 & playerTool == 0)) return 2;
    }

    // Tell wich player won the game :
    getFinalWinner(score, player){
        if(score[0] === score[1]) return "\n\nIl n'y a pas de gagnant !";

        if(score[0] > score[1]) return "\n\n<@!" + player.id + "> a gagné la partie !";

        if(score[1] > score[0]) return "\n\n<@!" + CLIENT.user.id + "> a gagné la partie !";
    }
}

module.exports = Shifumi;