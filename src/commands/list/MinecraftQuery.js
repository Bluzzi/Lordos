const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const GAMEDIG = require("gamedig");

class MinecraftQuery extends COMMAND {

    constructor(){
        super("minecraftquery", "(adresse) (port, par défault: 19132) (gametype, par défaut: minecraftbe)", "Permet de faire une requête à un serveur Minecraft BE.", [], "mquery");
    }

    execute(args, message){
        if(!args[0]) return false;

        let address = args[0];
        let port = parseInt(args[1]) ? parseInt(args[1]) : 19132;
        let gametype = args[2] == "minecraft" ? "minecraft" : "minecraftbe";

        GAMEDIG.query({
            type: gametype,
            host: address,
            port: port
        }).then((state) => {
            // Define all basic informations :
            let informationsText = "**__Voici les informations du serveur :__**\n\n";

            let informations = {
                "MOTD": state.name,
                "Adresse IP": address,
                "Port": port,
                "Ping": state.ping > 0 ? state.ping : "Indéfini",
                "Whitelist": state.password == true ? "Oui" : "Non"
            };

            for(let [info, value] of Object.entries(informations)){
                informationsText += "**" + info + " :** " + value + "\n\n";
            }

            // Add more informations (online player and plugins) :
            let playerList = [];

            for(let key in state.raw.bedrock.players){
                playerList.push(state.raw.bedrock.players[key]["name"]);
            }

            informationsText += "**" + "Joueurs (" + state.players.length + "/" +
            state.maxplayers + ")" + " :** " + playerList.join(", ") + "\n\n";

            informationsText += "**" + "Plugins (" + state.raw.bedrock.raw.plugins.split("; ").length 
            + ")" + " :** " + state.raw.bedrock.raw.plugins.replace("; ", ", ") + "\n\n";
            
            EMBED.send(informationsText, message.channel);
        }).catch((error) => {
            EMBED.send(`Le serveur \`${address}\` est introuvable !`, message.channel, 'RED');
        });
    }
}

module.exports = MinecraftQuery;