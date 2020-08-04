const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");

class Annonce extends COMMAND {

    constructor() {
        super("annonce", "Envoyer une annonce sous forme d'embed", "utils");

        this.setUsage("<texte>");
    }

    async execute(args, message){
        if(!args[0]) return false;
        
        message.delete();
        EMBED.send(args.join(" "), message.channel);
    }
}

module.exports = Annonce;