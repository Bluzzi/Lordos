const PLAYER_ONE = 0;
const PLAYER_TWO = 1;

let gamesInstances = {};

class TicTacToe {

    constructor(playerOne, playerTwo, message){
        // Save game players :
        self.players = [playerOne, playerTwo];

        // Save the game message :
        self.message = message;

        // Define the current player :
        self.currentPlayer = 0;

        // Save the game instance :
        gamesInstances[message.id] = self;
    }

    static get gameInstance(messageId){
        return gamesInstances[messageId];
    }

    setNextPlayer(playerNum){
        self.currentPlayer = playerNum;
    }

    get currentPlayer(){
        return self.currentPlayer;
    }
}

module.exports = TicTacToe;