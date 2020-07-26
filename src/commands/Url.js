const EMBED = require("../utils/Embed");
const CONSTANTS = require("../utils/Constants");
const Embed = require("../utils/Embed");
const { fstat } = require("fs");

const FS = require("fs");
const MP = require("html-metadata-parser") 



class Url {

    static execute(args, message){

        let config = JSON.parse(FS.readFileSync(__dirname + "/../resources/configs/url.json"),{encoding:"utf8"});
        args = args.map(function(value){
            return value.toLowerCase();
        });
        if(!args[0]){
            var text = config.usages.help.replace("%p%",CONSTANTS.prefix);
            EMBED.send(text, message.channel);
            return;
        }
        if(args[0] == "help"){
            text = config.usages.commands.replace("%p%",CONSTANTS.prefix);
            EMBED.send(text,message.channel);
            return;
        }
        if(args[0] == "list"){
            text = "Voici les différents liens enregistrés:\n";

            for(var key in config.links) {
                text = text + "\n" + " - " + key;
                if(config.aliases[key]){
                    text = text + ": (" + config.aliases[key].join(" | ") + ")";
                }
            }

            Embed.send(text,message.channel);

            return;
        }

        if(args[0] == "add" && args[1] && args[2]){
            console.log("done")
            if(config.links[args[1]] && args[2]!="alias"){
                console.log("1")
                var text = config.usages.exist_name.replace("%v%",args[1]);
                EMBED.send(text,message.channel);
                return;
            }
            console.log("1")
            if((!args[2].startsWith("https://") && !args[2].startsWith("http://")) && args[2] != "alias"){
                var text = config.usages.noturl;
                EMBED.send(text,message.channel);
                return;
            }
            console.log("2")

            if(args[2] != "alias"){
                config.links[args[1]] = args[2];
            }
            let error = [];


            if(args.length > 3){
                let slicedArgs = args.slice(3);
                for(var i = 0; i < slicedArgs.length; i++){
                    for(var key in config.aliases){
                        if(config.aliases[key].includes(slicedArgs[i])){
                            error.push(false);
                        }
                        else{
                            error.push(true);
                        }
                    }
                    if(error.every((currentValue) => currentValue == true)){
                        if(!config.aliases[args[1]]){
                            config.aliases[args[1]]=[];
                        }
                        config.aliases[args[1]].push(slicedArgs[i]);
                    }
                }
            }

            FS.writeFile(__dirname + "/../resources/configs/url.json", JSON.stringify(config, null, 4), (err) => {
                if(err) return console.log(err);
            });
            
            error = error.filter((bool) => !bool).length;

            EMBED.send("Done with " + error + " bad alias.", message.channel)

            return;
        }

        if(args[0] == "del" && args[1]){
            if(!config.links[args[1]]){
                text = config.usages.existnot.replace("%v%",args[1])
                EMBED.send(text,message.channel)
                return;
            }
            if(args[2] && args[2] == "alias"){
                delete config.aliases[args[1]]
            }
            else{
                delete config.links[args[1]]
            }
        
            FS.writeFile(__dirname + "/../resources/configs/url.json", JSON.stringify(config, null, 4), (err) => {
                if(err) return console.log(err);
            });

            EMBED.send("Done",message.channel)

            return;
        }

        if(config.links[args[0]]){
            let text = args[0].charAt(0).toUpperCase() + args[0].slice(1);
            MP.parser(config.links[args[0]], (error,result) => {
                EMBED.send("__**[" + text + "](" + config.links[args[0]] + ")**__\n\n" + result["meta"]["description"], message.channel);
            })
            return;        
        }
        for(var key in config.aliases){
            if(config.aliases[key].includes(args[0])){
                let text = key.charAt(0).toUpperCase() + key.slice(1);
                MP.parser(config.links[key], (error,result) => {
                    EMBED.send("__**[" + text + "](" + config.links[key] + ")**__\n\n" + result["meta"]["description"], message.channel);
                })
                return;
            }
        }
        
        Embed.send("Le lien nommé **" + args[0] + "** n'est pas enregistré.",message.channel);
        
    }


}

module.exports = Url;