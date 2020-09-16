const EMBED = require("../../../../utils/Embed")

const FS = require("fs")

class Delete {

    static execute(args, message, config){
        if(!args[0]) return EMBED.send("url del <nom>", message.channel);;

        let subConfig = config[message.guild.id];

        // Verify if name is already use or not :
        if(!subConfig.links[args[0]]){
            EMBED.send(config.usages.existnot.replace("{v}", args[0]), message.channel);
            return;
        }
        delete subConfig.links[args[0]];
        delete subConfig.aliases[args[0]];

        config[message.guild.id] = subConfig;

        // Update the config :
        FS.writeFile(__dirname + "/../../../../../resources/configs/url.json", JSON.stringify(config, null, 4), err => { if(err) return console.log(err) });

        EMBED.send("Url unregistered.", message.channel);
    }
}

module.exports = Delete;