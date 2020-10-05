const EMBED = require("../../../../utils/Embed");

class List {

    static execute(args, message, config){
        let text = "Liens enregistrés :\n";

        for(let link in config[message.guild.id].links){
            text += "\n- " +  link + " ("

            let aliases = []
            for(let alias of config[message.guild.id].aliases[link]){
                aliases.push(alias);
            }

            text += aliases.join(" | ") + ")"
        } 

        EMBED.send(text, message.channel); 
    }
}

module.exports = List;