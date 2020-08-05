const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");

const PREFIX = "**<Find the Number>** ";

class FindNumber extends COMMAND {

    constructor(){
        super("bingo", "Toutes les personnes présentes dans le salon sont les joueurs et doivent trouver le nombre choisi aléaoirement.", "game");

        this.setUsage("<min> <max>");
        this.setAliases(["fn"]);
    }

    async execute(args, message){
        if(args.length < 2 || parseInt(args[0]) > parseInt(args[1])) return false;

        // Random number :
        args = args.map(num => parseInt(num));

        let randomNumber = Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0];

        // Send start message :
        EMBED.send(PREFIX + "Soyez le premier a trouver un nombre entre **" + args[0] + "** et **" + args[1] + "**.", message.channel);

        // Create message collector :
        let collector = message.channel.createMessageCollector(msg => msg.content == randomNumber, {time: 1000 * 60 * 5});

        // Collect the messages :
        collector.on("collect", msg => {
            EMBED.send(PREFIX + "<@" + msg.author.id + "> a gagné la partie !! 🎉🎉 Le nombre à trouver était **" + randomNumber + "**.", msg.channel);

            collector.stop();
        });
    }
}

module.exports = FindNumber;