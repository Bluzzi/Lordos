const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/Color");

const PREFIX = "**<Puissance 4>** ";

const EMOJIS = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣"]

const RULES = [
    PREFIX,
    "\n__Règles :__\n\n*But du jeu :*",
    "\nLe but est d'aligner 4 des ses pions à l'horizontal, à la verticale ou en diagonale avant l'adversaire.",
    "\n\n*Jouer un tour :*",
    "\n Tour à tour, cliquez sur la réaction correspondant à la colonne sur laquelle vous voulez jouer."
];

class Puissance4 extends COMMAND {

    constructor(){
        super("puissance4", "Jouer au puissance 4 contre un autre membre du discord", "game");

        this.setAliases(["p4"]);
        this.setUsage("<play | rules>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    execute(args, message) {
        switch(args[0]){
            case "play":
                return this.game(args, message);
            case "rules":
                return EMBED.send(RULES.join(""), message.channel);
            default:
                return false;
        }
    }

    game(args, message){
        // Send message to ask for a game :
        EMBED.send(PREFIX + " Clickez sur la réaction pour affronter <@" + message.author + "> en duel !", message.channel).then((msg) => {
            msg.react("⚔️");

            let collector = msg.createReactionCollector((reac) => true, {time: 60000});

            collector.on('collect', (reaction, user) => {
                // Get the second player :
                if(!user.bot & user.id != message.author.id){
                    collector.stop("stop");

                    EMBED.send(PREFIX + " La partie entre <@"+ message.author +"> (🔵) et <@"+ user +"> (🔴) commence...", message.channel);
                    this.playGame(message.author, user, message);
                }
            })

            collector.on("end", (collected, reason) => {
                if(reason != "stop"){
                    let newEmbd = new DISCORD.MessageEmbed().setDescription(PREFIX +"\n```yaml\nPartie expirée.```");

                    msg.edit(newEmbd);
                }
            });
        });
    }

    playGame(player1, player2, message){
        // Set symbols :
        let symbols = {a : "🔵", b:"🔴"};

        symbols[message.author.id] =  "🔵";
        symbols[player2.id] =  "🔴";

        // Send game message, then start game :
        let grid = this.createGrid();

        message.channel.send(this.gridToText(grid)).then((message) => {
            for(let i of EMOJIS) message.react(i);

            EMBED.send(PREFIX + "Au tour de ...", message.channel).then(subMessage => {
                // Play the first round :
                this.playRound(player1, player2, message, subMessage, grid, symbols);
            });
        })
    }

    playRound(player, waiter, message, subMessage, grid, symbols){
        // Edit the round indicator message :
        this.editPlayerRoundIndicationMessage(subMessage, player);

        // Edit the grid message :
        message.edit(this.gridToText(grid));

        // Create the reaction collector :
        let collector = message.createReactionCollector((reaction, user) => [player.id, waiter.id].includes(user.id), {time: 180000});

        collector.on("collect", (reaction, user) => {
            // Verify is the user who react is the current player or not :
            if(user.id != player.id){
                message.reactions.resolve(reaction.emoji.name).users.remove(user);
                return;
            }

            // Modify grid to play :
            grid = this.addPawn(grid, EMOJIS.indexOf(reaction.emoji.name), symbols[player.id]);

            // Stop collector, delete last reaction :
            collector.stop("stop");

            // Remove reaction or end game :
            switch(this.isColumnFull(grid, EMOJIS.indexOf(reaction.emoji.name))){
                case 0:
                    EMBED.send("Egalité ! Toutes les cases ont été rempli sans faire puissance 4.", message.channel);

                    collector.stop("stop");
                    return;
                break;

                case 1:
                    message.reactions.resolve(reaction.emoji.name).users.remove(user);
                break;
                
                case 2:
                    reaction.remove();
                break;
            }

            // Verify if the game is ended or not :
            let win = this.winVerification(grid);

            // End the game or play a new round :
            if(win == "win"){
                // Edit the message a last time :
                message.edit(this.gridToText(grid));

                // Send victory message :
                EMBED.edit(subMessage, "<@" + player + "> a gagné la partie contre <@" + waiter + "> !", message.channel);
                EMBED.send("<@" + player + "> a gagné la partie de " + PREFIX + "contre <@" + waiter + "> !", message.channel);
            } else {
                // Play others rounds :
                this.playRound(waiter, player, message, subMessage, grid, symbols);
            }
        });

        // If collector get out of time :
        collector.on("end", (collected, reason) => {
            if(reason != "stop"){
                let embed = new DISCORD.MessageEmbed();

                embed.setDescription(PREFIX + "\n<@" + player + "> n'a pas joué à temps, <@" + waiter + "> est déclaré vainqueur !");
                embed.setColor(COLOR.GREEN);

                subMessage.edit(embed);
            }
        });
    }

    /**
     * Edit the round indicator message
     * @param {DISCORD.Message} message 
     * @param {string} player id
     */
    editPlayerRoundIndicationMessage(message, player){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(PREFIX + "Au tour de <@" + player + "> !");
        embed.setColor(COLOR.GREEN);

        message.edit(embed);
    }

    /**
     * Create the grid
     */
    createGrid(){
        let grid = [];

        for(let a = 0; a < 6; a++){
            let line = [];

            for(let i = 0; i < 7; i++) line.push("🔳");

            grid.push(line);
        }

        return grid;
    }

    /**
     * Check if a column is full
     * @param {array} grid 
     * @param {array} column 
     */
    isColumnFull(grid, column){
        for(let i of grid) if(i[column] == "🔳") return 1;
        for(let i of grid) for(let a of i) if(a == "🔳") return 2;

        return 0;
    }

    /**
     * Return the grid as text
     * @param {array} grid 
     */
    gridToText(grid){
        let text = "";

        for(let i of grid) text += i.join("") + "\n";

        text += EMOJIS.join("") + "\n";

        return text;
    }

    /**
     * Return the grid with the new pawn
     * @param {array} grid 
     * @param {array} column 
     * @param {Object} symbol 
     */
    addPawn(grid, column, symbol){
        for(let i = 5; i > -1; i--){
            if(grid[i][column] === "🔳"){
                grid[i][column] = symbol;
                
                return grid;
            }
        }
    }

    /**
     * Verify if a player has win
     * @param {array} grid 
     */
    winVerification(grid){
        // Verify lines :
        for(let i = 0; i < 6; i++){
            for(let a = 0; a < 4; a++){
                if(grid[i][a] == grid[i][a + 1] & grid[i][a] == grid[i][a + 2] & grid[i][a] == grid[i][a + 3] & grid[i][a] != "🔳"){
                    return "win";
                }
            }
        }
        // Verify columns :
        for(let i = 0; i < 7; i++){
            for(let a = 0; a < 3; a++){
                if(grid[a][i] == grid[a + 1][i] & grid[a][i] == grid[a + 2][i] & grid[a][i] == grid[a + 3][i] & grid[a][i] != "🔳"){
                    return "win";
                }
            }
        }
        // Verify descending diagonals :
        for(let i = 0; i < 3; i++){
            for(let a = 0; a < 4; a++){
                if(grid[i][a] == grid[i + 1][a + 1] & grid[i][a] == grid[i + 2][a + 2] & grid[i][a] == grid[i + 3][a + 3] & grid[i][a] != "🔳"){
                    return "win";
                }
            }
        }
        // Verify ascending diagonals :
        for(let i = 5; i > 2; i--){
            for(let a = 0; a < 4; a++){
                if(grid[i][a] == grid[i - 1][a + 1] & grid[i][a] == grid[i - 2][a + 2] & grid[i][a] == grid[i - 3][a + 3] & grid[i][a] != "🔳"){
                    return "win";
                }
            }
        }
    }
}

module.exports = Puissance4;