const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const CONSTANTS = require("../../../utils/Constants");
const GIPHY = require("giphy-api")(CONSTANTS.giffyKey);

class Gif extends COMMAND {

    constructor(){
        super("gif", "Affiche un gif aléatoire selon votre recherche", "fun");

        this.setUsage("<recherche>");
    }

    async execute(args, message){
        if(!args[0]) return false;

        GIPHY.random(args.join(" ")).then(response => {
            if(response.data && response.data.url){
                message.channel.send(response.data.url);
            } else {
                EMBED.send("Aucun gif n'existe pour votre recherche.", message.channel);
            }
        });
    }
}

module.exports = Gif;