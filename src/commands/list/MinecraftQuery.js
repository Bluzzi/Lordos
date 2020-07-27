const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const GAMEDIG = require("gamedig");

class MinecraftQuery extends COMMAND {
    constructor(){
        super("minecraftquery", "<adresse> [port (défaut: 19132)]", "Permet de faire une requête à un serveur Minecraft BE", [], "mquery");
    }

    execute(args, message){
        if(!args[0]) {
            return false;
        } else {
            let address = args[0];
            let port = parseInt(args[1]) || 19132;
            GAMEDIG.query({
                type: 'minecraftbe',
                host: address,
                port: port
            }).then((state) => {
                EMBED.send(`**Résultat de la requête à ${address} (port: ${port})** :\n\n**Ping** : ${state.ping > 0 ? state.ping : "Indéfini"}\n**MOTD** : ${state.name}\n**Whitelist** : ${state.password == true ? "Oui" : "Non"}\n**Joueurs en ligne** : ${state.players.length}/${state.maxplayers}\n`, message.channel, 'GREEN');
            }).catch((error) => {
                EMBED.send(`Le serveur \`${address}\` est introuvable !`, message.channel, 'RED');
            });
        }
    }
}

module.exports = MinecraftQuery;