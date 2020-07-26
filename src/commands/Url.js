const EMBED = require("../utils/Embed");
const CONSTANTS = require("../utils/Constants");
const Embed = require("../utils/Embed");

var links = {
    "codingame":"https://www.codingame.com/multiplayer/clashofcode",
    "chess":"https://lichess.org/",
    "werewolf":"https://wolfy.fr/play",
    "fortnite":"https://1v1.lol/",
    "skribbl":"https://skribbl.io/",
    "paper":"https://paper-io.com/",
    "wikipedia":"https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard",
    "geoguessr":"https://www.geoguessr.com/"
}

var aliases = {
    "codingame":["cg"],
    "chess":["échec","cs"]
}
class Url {

    static execute(args, message){
        args = args.map(function(value){
            return value.toLowerCase()
        });
        if(!args[0]){
            EMBED.send("Vous devez faire ``" + CONSTANTS.prefix + "url (list | url)``.", message.channel);
            return;
        }

        if(args[0] == "list"){
            text = "Voici les différents liens enregistrés:\n"
            for(var key in links) {
                var text = text + "\n" + " - " + key
                if(aliases[key]){
                    text = text + ": (" + aliases[key].join(" | ") + ")"
                }
            }

            Embed.send(text,message.channel)

            return;
        }

        if(args[0] == "add" && args[1]){
            EMBED.send("Coming soon...",message.channel)

            return;
        }
        if(args[0] == "del" && args[1]){
            EMBED.send("Coming soon...",message.channel)

            return;
        }

        if(links[args[0]]){
            EMBED.send("Voici le lien vers **" + args[0] +"**:\n" + links[args[0]],message.channel)
            
            return;        
        }
        for(var key in aliases){


            if(aliases[key].includes(args[0])){
                EMBED.send("Voici le lien vers **" + key +"**:\n" + links[key],message.channel)
                return;
            }
        }
        Embed.send("Le lien nommé **" + args[0] + "** n'est pas enregistré.",message.channel)
        
    }
}

module.exports = Url;