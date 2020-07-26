const COMMAND = require("../Command");

class Dice extends COMMAND {
    constructor() {
        super("dice", "usage",  [], []);
    }

    execute(args, message) {
        if (!args[0]) {
            
        } else {   

        }
    }
}

module.exports = Dice;