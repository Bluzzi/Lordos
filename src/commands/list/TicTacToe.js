const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

var games = []

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
        EMBED.send("**<TicTacToe>** Clicker sur la réaction pour affronté <@" + message.author.id + "> en duel !", message.channel).then(msg => msg.react("⚔️"));
    }
}

module.exports = TicTacToe;