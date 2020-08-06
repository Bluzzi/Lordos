const COMMAND= require("../../Command");
const EMBED = require("../../../utils/Embed");

class Reverse extends COMMAND {

    constructor(){
        super("reverse", "Vous renvoie votre texte à l'envers", "fun");

        this.setUsage("<texte>");
    }

    async execute(args, message){
        if(!args[0]) return false;

        EMBED.send(args.join(" ").split("").reverse().join(""), message.channel);
    }
}

module.exports = Reverse;