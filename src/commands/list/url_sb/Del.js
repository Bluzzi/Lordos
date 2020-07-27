const EMBED = require("../../../utils/Embed")

const FS = require("fs")

class Delete {

    static execute(args, message, config){
        // Verify the structure of the command :
        if(!args[0]){
            EMBED.send("Vous devez spécifier le nom d'un lien.", message.channel);
        } else {
            // If equal alias, must delete only aliases, else delete the entire components of url :
            if(args[1] && args[1] == "alias"){ 
                delete config.aliases[args[0]];
            } else {
                delete config.links[args[0]];
                delete config.aliases[args[0]];
            }
            
            //Update the config :
            FS.writeFile(__dirname + "/../../../resources/configs/url.json", JSON.stringify(config, null, 4), (err) => { if(err) return console.log(err) });


            EMBED.send("Deleted " + args[0], message.channel)
        }
    }
}

module.exports = Delete;