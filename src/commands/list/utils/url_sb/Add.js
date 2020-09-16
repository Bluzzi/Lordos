const EMBED = require("../../../../utils/Embed");
const URL = require("../Url");
const FS = require("fs");

class Add {

    static execute(args, message, config){
        if(!args[0]) return EMBED.send("url add <nom> <url | alias> <multiple alias...", message.channel);

        let subConfig = config[message.guild.id];

        // Verify if name is a banned name or not :
        if(args[0].includes(Object.keys[URL.SUB_COMMANDS])){
            EMBED.send("Vous ne pouvez pas enregistrer de lien à ce nom.");
            return;
        }

        if(args[1] !== "alias" && subConfig.links[args[0]]){
            // Verify if name is already use or not :
            if(subConfig.links[args[0]]){
                EMBED.send(config.usages.exist_name.replace("{v}", args[0]), message.channel);
                return;
            }
            // Verify if given url seems like a real website :
            let pat = /^https?:\/\//i;
            if (!pat.test(args[1]))
            {
                EMBED.send(config.usages.noturl, message.channel);
                return;
            }
            subConfig.links[args[0]] = args[1];
        }

        // Add aliases
        if(!subConfig.aliases[args[0]]){
            subConfig.aliases[args[0]] = [];
        }
        let aliases = 0;

        if(args.length >= 3){
            let slicedArgs = args.slice(2);
            for(var i = 0; i < slicedArgs.length; i++){
                if(subConfig.aliases[args[0]][slicedArgs[i]])continue;

                subConfig.aliases[args[0]].push(slicedArgs[i]);
                aliases += 1;
            }
        }


        config[message.guild.id] = subConfig;

        // Update the config :
        FS.writeFile(__dirname + "/../../../../../resources/configs/url.json", JSON.stringify(config, null, 4), err => { if(err) return console.log(err) });

        EMBED.send("Url registered.\nadd " + aliases + " aliases.", message.channel);
    }
}

module.exports = Add;