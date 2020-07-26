const EMBED = require("../../../utils/Embed");

class List{

    static execute(args, message, config){
        let text = "Liens enregistrés :";

        for(let link in config.links) text += "\n-" +  link;

        EMBED.send(text, message.channel);
    }
}