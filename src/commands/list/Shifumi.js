const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const CANVAS = require("canvas");
const DISCORD = require("discord.js");

const PREFIX = "**<Shifumi>**";

const emojis = ["✌️","🤚","👊"];

class Shifumi extends COMMAND {

    constructor(){
        super("shifumi", "number", "Jouer au shifumi contre Lordos.", [], "t");
    }

    execute(args, message){
        // Verify if args[0] is a number or not :
        if(isNaN(args[0])){
            EMBED.send(this.getUsage(), message.channel);
            return;
        }

        // Send the start message, then start :
        let file = new DISCORD.MessageAttachment(__dirname + "/../../../resources/images/shifumi/shifumi.png", 'shifumi.png');
                EMBED.send("<@" + message.author.id + "> a commencé un shifumi contre Lordos !", message.channel, {attachment:file,title:PREFIX}).then((msg) => this.newRound(msg, message, [0, 0], args[0]));

    }

    // Play round funcion :
    newRound(msg, message, score, rounds){
        // Decrease one to total round :
        rounds -= 1;

        // Add reactions :
        for(let i of emojis) msg.react(i);

        // Create collector :
        let collector = msg.createReactionCollector((reac, user) => user.id === message.author.id, {time:60000});
        collector.on('collect', (reaction, user) => {
            collector.stop("stop")

            // Set up tools in variables :
            let playerTool = emojis.indexOf(reaction.emoji.name);
            let botTool = Math.floor(Math.random() * 2);

            // Get the round winner and create a text :
            let text = PREFIX;
            switch(this.getWinner(playerTool, botTool)){
                case 0:
                    text += "  Pas de vainqueur à cette manche !";
                    break;
                case 1:
                    text += "  Un point de plus pour <@!" + user.id + "> !";
                    score[0] += 1;
                    break;
                case 2:
                    text += "  Un point de plus pour <@!" + CLIENT.user.id + ">";
                    score[1] += 1;
                    break;
            }
            text += "\n\n**" + user.username + "** : " + score[0] + "\n**Lordos** : " + score[1];

            // Show the image :
            this.createImage(playerTool, botTool).then((image) => {
                // Verify if round was the last or not :
                if(rounds > 0){
                    // Send image, then start a new round :
                    EMBED.send(text, message.channel, {attachment:image}).then((msg)=> this.newRound(msg, message, score, rounds));
                }
                else{
                    // Send image, then send ending message :
                    EMBED.send(text, message.channel, {attachment:image}).then(() => {
                        text = "La partie est finie !\n\n__Score final :__\n\n**" + user.username + "** : " + score[0] + "\n**Lordos** : " + score[1] + this.getFinalWinner(score, user);
                        EMBED.send(text, message.channel);
                    })
                }
            })
        })


        // If collector timeout :
        collector.on('end', (collected, reason) => {
            if(reason != "stop"){
                let newEmbd = new DISCORD.MessageEmbed().setDescription(PREFIX +"\n```yaml\nPartie expirée.```");
                msg.edit(newEmbd);
            }
        });
    }


    // Create the image with the two tools, return an attachment :
    async createImage(playerTool, botTool){
        let tools = ["ciseaux", "feuille", "pierre"]

        const canvas = CANVAS.createCanvas(350, 200);
        const ctx = canvas.getContext('2d');

        ctx.rect(0,0,380,380)
        ctx.fillStyle = "white";
        ctx.fill(); 
        // Add player tool :
        let path = "/../../../resources/images/shifumi/" + tools[playerTool] + ".png";
        let image = await CANVAS.loadImage(__dirname + path);
        ctx.drawImage(image, 25, 25);

        // Add bot tool :
        path = "/../../../resources/images/shifumi/" + tools[botTool] + "2.png";
        image = await CANVAS.loadImage(__dirname + path);
        ctx.drawImage(image, 175, 25);


        // Send the message :
        return new DISCORD.MessageAttachment(canvas.toBuffer(), 'test.png');
    }


    // Tell wich of the player won the round :
    getWinner(playerTool, botTool){
        if(playerTool == botTool) return 0;
    
        if((playerTool == 0 & botTool == 1) | (playerTool == 1 & botTool == 2) | (playerTool == 2 & botTool == 0)) return 1;

        if((botTool == 0 & playerTool == 1) | (botTool == 1 & playerTool == 2) | (botTool == 2 & playerTool == 0)) return 2;
    }

    // Tell wich player won the game :
    getFinalWinner(score, player){
        if(score[0] == score[1]) return "\n\nIl n'y a pas de gagnant !";
        if(score[0] > score[1]) return "\n\n<@!" + player.id + "> a gagné la partie !";
        if(score[1] > score[0]) return "\n\n<@!" + CLIENT.user.id + "> a gagné la partie !";
    }
}

module.exports = Shifumi;