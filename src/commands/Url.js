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

class Url {

    static execute(args, message){
        if(!args[0]){
            EMBED.send("Vous devez faire ``" + CONSTANTS.prefix + "url (list | url)``.", message.channel);
            return;
        }

        if(args[0].toLowerCase() == "list"){
            text = "Voici les différents liens enregistrés:\n"
            for(var key in links) {
                var text = text + "\n" + " - " + key
            }

            Embed.send(text,message.channel)

            return;
        }

        if(!links[args[0]]){
            
            Embed.send("Le lien nommé **" + args[0] + "** n'est pas enregistré.",message.channel)

            return;
        }
        
        EMBED.send("Voici le lien vers **" + args[0] +"**:\n" + links[args[0]],message.channel)
    }
}

module.exports = Url;