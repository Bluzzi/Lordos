const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const DISCORD = require("discord.js");

const PREFIX = "**<TicTacToe>** ";

let emojiNumbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

let playersSymbols = {};

let three = "❌";
let circle = "⭕";

class TicTacToe extends COMMAND {

    constructor() {
        super(
            "tictactoe",
            "", 
            "Faire une parti de TicTocToe contre un autre joueur.", 
            [], 
            "ttt"
        );
    }

    async execute(args, message){
        EMBED.send(PREFIX + "Clickez sur la réaction pour affronter <@" + message.author.id + "> en duel !", message.channel).then(msg => {
            // Add reaction for accept the duel :
            msg.react("⚔️");

            // Create the reaction collector for get ennemi :
            let filter = (reaction, user) => {
                return reaction.emoji.name === "⚔️" && ![message.author.id, CLIENT.user.id].includes(user.id);
            }

            let collector = msg.createReactionCollector(filter, { time: 1000 * 60 * 5 });

            // Check reactions :
            collector.on("collect", (reaction, user) => {
                // Start the game and stop this collector :
                this.startGame(message.author, user, message.channel);

                msg.delete();
                collector.stop();
            });

            // Remove the embed after 5 minutes :
            collector.on("end", (collected, reason) => msg.delete());
        });
    }

    startGame(playerOne, playerTwo, channel){
        // Alternate first player to play :
        if(Math.random() > 0.49){
            let temp = playerOne;

            playerOne = playerTwo;
            playerTwo = temp;
        }

        // Send the start message :
        EMBED.send(PREFIX + "La partie entre <@" + playerOne.id + "> (" + three + ") et <@" + playerTwo.id + "> (" + circle + ") commence...", channel);

        // Create the grid :
        let grid = this.createGrid(emojiNumbers);

        // Send the grid :
        let emojisOfGrid = [];

        channel.send(grid).then(message => {
            // Add reactions and save emojis of grids :
            emojiNumbers.forEach(emoji => {
                message.react(emoji);
                emojisOfGrid.push(emoji);
            });

            // Define the players symbols : 
            if(!playersSymbols[channel.guild.id]) playersSymbols[channel.guild.id] = [];
            if(!playersSymbols[channel.guild.id][message.id]) playersSymbols[channel.guild.id][message.id] = []; 

            playersSymbols[channel.guild.id][message.id][playerOne.id] = three;
            playersSymbols[channel.guild.id][message.id][playerTwo.id] = circle;

            // Add the message to indicate the player must play :
            EMBED.send(PREFIX + "Au tour de ...", channel).then(subMessage => {
                // Play the first round :
                this.playRound(playerOne, playerTwo, message, subMessage, emojisOfGrid);
            });
        });
    }

    playRound(player, waiter, gameMessage, subMessage, emojisOfGrid){
        // Indicates that she must play :
        this.editPlayerRoundIndicationMessage(subMessage, player);

        // Check the reaction of the current player :
        let collector = gameMessage.createReactionCollector((reaction, user) => [player.id, waiter.id].includes(user.id), { time: 1000 * 60 * 5 });

        collector.on("collect", (reaction, user) => {
            // Check to see if the reaction was set by someone other than the player in that round :
            if(user.id === waiter.id){
                gameMessage.reactions.resolve(reaction.emoji.name).users.remove(user);
                return;
            }

            // Check if this emoji is a valid number reaction and remove all reaction of this number :
            if(emojisOfGrid.includes(reaction.emoji.name) && ![three, circle].includes(reaction.emoji.name)){
                reaction.remove();
            } else {
                return;
            }

            // Edit the grid emojis :
            for(let key in emojiNumbers){
                if(reaction.emoji.name === emojiNumbers[key]){
                    emojisOfGrid[key] = playersSymbols[gameMessage.guild.id][gameMessage.id][player.id];
                }
            }

            gameMessage.edit(this.createGrid(emojisOfGrid));

            // Check if the player won :
            if(this.playerHasWon(playersSymbols[gameMessage.guild.id][gameMessage.id][player.id], emojisOfGrid)){
                // Message of the winner :
                let embed = new DISCORD.MessageEmbed();

                embed.setDescription(PREFIX + "Bravo <@" + player.id + "> ! Tu as gagné la partie 👏");
                embed.setColor(EMBED.COLOR_GREEN);

                subMessage.edit(embed);

                // Remove all emojis :
                gameMessage.reactions.cache.forEach(emoji => {
                    emoji.remove();
                });
            } else {
                let resteCount = 0;

                emojiNumbers.forEach(emoji => {
                    if(emojisOfGrid.includes(emoji)) resteCount += 1;
                });

                if(resteCount === 0){
                    // Party null :
                    let embed = new DISCORD.MessageEmbed();

                    embed.setDescription(PREFIX + "Personne n'a gagné.");
                    embed.setColor(EMBED.COLOR_GREEN);

                    subMessage.edit(embed);
                } else {
                    // Next round :
                    this.playRound(waiter, player, gameMessage, subMessage, emojisOfGrid);
                }   
            }

            // Stop the collector :
            collector.stop();
        });
    }

    playerHasWon(playerSymbol, grid){
        // Vertical check :
        for(let i = 0; i <= 2; i++) for(let a = 0; a < 9; a += 3){
            if(grid[i + a] === playerSymbol){
                if(a === 6) return true;
            } else {
                break;
            }
        }

        // Horizontal check :
        for(let i = 0; i < 9; i += 3) for(let a = 0; a <= 2; a++){
            if(grid[i + a] === playerSymbol){
                if(a === 2) return true;
            } else {
                break;
            }
        }

        // Diagonal check :
        for(let i = 0; i < 9; i += 4){
            if(grid[i] === playerSymbol){
                if(i === 8) return true;
            } else {
                break;
            }
        }

        for(let i = 2; i < 9; i += 2){
            if(grid[i] === playerSymbol){
                if(i === 6) return true;
            } else {
                break;
            }
        }

        return false;
    }

    createGrid(emojis){
        let gridString = "";

        for(let key in emojis){
            gridString += emojis[key];
        
            if((key + 1) % 3 === 0) gridString += "\n";
        }

        return gridString;
    }

    editPlayerRoundIndicationMessage(message, player){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(PREFIX + "Au tour de <@" + player.id + "> !");
        embed.setColor(EMBED.COLOR_GREEN);

        message.edit(embed);
    }
}

module.exports = TicTacToe;