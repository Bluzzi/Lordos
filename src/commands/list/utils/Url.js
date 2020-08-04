const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const CONSTANTS = require("../../../utils/Constants");

const FS = require("fs");
const MP = require("html-metadata-parser");

const SUB_COMMANDS = {
    "list": "Voir la liste des URLs.",
    "add": "Ajouter un url.",
    "del": "Supprimer un url ou ses alias."
};

class Url extends COMMAND {

    constructor(){
        super("url", "Enregistre une URL", "utils")

        this.setUsage("<add/del/list> <donnée>");
    }

    async execute(args, message){
        let config = JSON.parse(FS.readFileSync(
            __dirname + "/../../../resources/configs/url.json"), 
            {encoding:"utf8"}
        );

        args = args.map(value => value.toLowerCase());
        var subCommand = args.shift();

        // Isset not argument sent, send the command usage, else if get the sub command :
        if(!subCommand || subCommand === "help"){
            this.sendHelp(message.channel);
        } else {
            let subCommandPath = __dirname + "/url_sb/" + subCommand + ".js";
            
            if(Object.keys(SUB_COMMANDS).includes(subCommand) && FS.existsSync(subCommandPath)){
                // Execute the sub command :
                let subCommandClass = require(subCommandPath);

                subCommandClass.execute(args, message, config);
            } else {
                // Check if the link exist, otherwise send the help message :
                if(config.links[subCommand]){
                    let text = subCommand.charAt(0).toUpperCase() + subCommand.slice(1);

                    MP.parser(config.links[subCommand], (error, result) => {
                        text = "__**[" + text + "](" + config.links[subCommand] + ")**__";

                        text = result && result["meta"]["description"] ? text + "\n\n" + result["meta"]["description"] : text;

                        EMBED.send(text, message.channel);
                    });
                    
                    return;
                } else {
                    for(var key in config.aliases){ //TODO: optimize this ?
                        if(config.aliases[key].includes(subCommand)){
                            let text = key.charAt(0).toUpperCase() + key.slice(1);

                            MP.parser(config.links[key], (error, result) => {
                                EMBED.send("__**[" + text + "](" + config.links[key] + 
                                ")**__\n\n" + result["meta"]["description"], message.channel);
                            })

                            return;
                        }
                    }
                }
                
                // Send help message :
                EMBED.send("Le lien nommé **" + subCommand + "** n'est pas enregistré.", message.channel);

                this.sendHelp(message.channel);
            }
        }
    }

    sendHelp(channel){
        let text = "Voici les différentes commandes :\n"

        for(let [subCommandName, description] of Object.entries(SUB_COMMANDS)){
            text += "\n" + CONSTANTS.prefix + "url " + subCommandName + " : " + description;
        }

        EMBED.send(text, channel);
    }
}

module.exports = Url;
module.exports.SUB_COMMANDS = SUB_COMMANDS;