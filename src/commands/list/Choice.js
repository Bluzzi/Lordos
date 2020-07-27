const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Choice extends COMMAND {
    constructor() {
        super("choice");
    }

    async execute(args, message){
        if(!args[1]) {
            EMBED.send(`Utilisation invalide ! Essayez : ${CLIENT.CONSTANTS.prefix}choice <choix 1> <choix 2>...`, message.channel, 'RED');
        } else {
            let percent = Math.round(1/args.length*100);
            let choice = args[Math.floor(Math.random()*(args.length - 0))];
            EMBED.send(`Mon choix est **${choice}** ! (${percent}%)`, message.channel);
        }
    }
}

module.exports = Choice;