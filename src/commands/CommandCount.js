const EMBED = require("../utils/Embed");
const FS = require("fs");

class CommandCount {

    static execute(args, message){
        let commandCount = FS.readdirSync(__dirname).length;
        let objective = 200;

        EMBED.send("Il y a actuellement " + commandCount + " commandes sur ce bot.", message.channel);

        if(commandCount > objective){
            EMBED.send("Objectif de " + objective + " atteint ! :tada:", message.channel);
        } else {
            EMBED.send("Objectif : " + objective + ", soit encore " + (objective - commandCount) + " !", message.channel);
        }
    }
}

module.exports = CommandCount;