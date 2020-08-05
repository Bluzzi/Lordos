const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");

class CommandCount extends COMMAND {
    
    constructor(){
        super("commandcount", "Vous donne le nombre de commandes existante sur le bot ainsi que son objectif", "information");

        this.setUsage("<bot ou cli, par default : bot>");
    }

    async execute(args, message){
        let type = args[0] == "cli" ? "cli" : "bot";
        let commandCount = type == "cli" ? CLIENT.COMMANDMANAGER.all(true).length : CLIENT.COMMANDMANAGER.all().length;
        let objective = type == "cli" ? 50 : 200;
        let percent = parseFloat(commandCount/objective*100).toFixed(2);

        EMBED.send("Il y a actuellement " + commandCount + " commandes de type " + type.toUpperCase(), message.channel);

        if(commandCount > objective){
            EMBED.send("Objectif de " + objective + " atteint ! :tada:", message.channel);
        } else {
            EMBED.send("Objectif : " + objective + ", soit encore " + (objective - commandCount) + " ! (" + percent + "%)", message.channel);
        }
    }
}

module.exports = CommandCount;