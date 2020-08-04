const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");

class RandomNumber extends COMMAND {

    constructor(){
        super("random-number", "Générer un nombre aléatoire entre deux valeurs", "fun");

        this.setUsage("<min> <max>");
        this.setAliases(["rn"]);
    }

    async execute(args, message){
        if(args.length < 2 || parseInt(args[0]) > parseInt(args[1])) return false;

        args = args.map(num => parseInt(num));

        EMBED.send(Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0], message.channel);
    }
}

module.exports = RandomNumber;