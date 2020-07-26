const EMBED = require("../../../utils/Embed");
const URL = require("../Url");

class Add {

    static execute(args, message, config){
        // Verify if name is a banned name or not :
        if(args[0].includes(Object.keys[URL.SUB_COMMANDS])){
            EMBED.send("Vous ne pouvez pas enregistrer de lien à ce nom.");
        } else 
        // Verify if name is already use or not :
        if(config.links[args[1]] && args[2] !== "alias"){
            EMBED.send(config.usages.exist_name.replace("{v}", args[1]), message.channel);
        } else 
        // Verify if given url seems like a real website :
        if((!args[2].startsWith("https://") && !args[2].startsWith("http://")) && args[2] !== "alias"){
            EMBED.send(config.usages.noturl, message.channel);
        }
        // If equal Alias, only add aliases :
        if(args[2] != "alias") config.links[args[1]] = args[2];

        // Add all the given aliases to the given url's name :
        let error = [];

        if(args.length > 3){
            let slicedArgs = args.slice(3);

            for(var i = 0; i < slicedArgs.length; i++){
                for(var key in config.aliases) error.push(!config.aliases[key].includes(slicedArgs[i]));

                if(error.every((currentValue) => currentValue == true)){
                    if(!config.aliases[args[1]]) config.aliases[args[1]] = [];

                    config.aliases[args[1]].push(slicedArgs[i]);
                }
            }
        }

        // Update the config :
        FS.writeFile(__dirname + "/../resources/configs/url.json", JSON.stringify(config, null, 4), err => { if(err) return console.log(err) });

        EMBED.send("Done with " + error.filter((bool) => !bool).length + " bad alias.", message.channel);
    }
}

module.exports = Add;