const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const GAMEDIG = require("gamedig");
const DISCORD = require("discord.js");

class MinecraftQuery extends COMMAND {

    constructor(){
        super("minecraftquery", "Permet de faire une requête à un serveur Minecraft BE", "information");

        this.setUsage("<adresse> [port, par default : 19132] [mc:java ou mc:be, par default : mc:be]");
        this.setAliases(["mquery"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
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
            
            EMBED.reply(informationsText, message);
        }).catch((error) => {
            EMBED.reply(`Le serveur \`${address}\` est introuvable !`, message, 'RED');
        });
    }
}

module.exports = MinecraftQuery;