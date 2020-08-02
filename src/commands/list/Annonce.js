const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Annonce extends COMMAND {

    constructor() {
        super(
            "annonce",
            "(votre annonce)", 
            "Envoyer une annonce sous forme d'embleme.", 
            ["ADMINISTRATOR"],
            "a"
        );
    }

    async execute(args, message){
        if(!args[0]) return false;
        
        message.delete();
        EMBED.send(args.join(" "), message.channel);
    }
}

module.exports = Annonce;