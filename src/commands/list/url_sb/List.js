const EMBED = require("../../../utils/Embed");

class List {

    static execute(args, message, config){
        let text = "Liens enregistrés :\n";

        for(let link in config.links){
            let aliases = [];

            //for(let i = 0; )
            for(let alias in config.aliases[link]){
                aliases.push(config.aliases[link][alias])
            }
            
            text += "\n- " +  link
            if(aliases.length != 0){
                text += "(" + aliases.join(", ") + ")";
            }
        } 

        EMBED.send(text, message.channel);
    }
}

module.exports = List;