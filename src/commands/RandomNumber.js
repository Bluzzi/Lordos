const EMBED = require("../utils/Embed");
const CONSTANTS = require("../utils/Constants");

class RandomNumber {
    
    static execute(args, message){
        if(args.length < 2 || parseInt(args[0]) > parseInt(args[1])){
            EMBED.send("Vous devez faire ``" + CONSTANTS.prefix + "randomnumber (min) (max)``.", message.channel);
            return;
        }

        args = args.map(num => parseInt(num));

        EMBED.send(Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0], message.channel);
    }
}

module.exports = RandomNumber;