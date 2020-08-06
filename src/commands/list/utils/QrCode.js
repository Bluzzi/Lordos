const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class QrCode extends COMMAND {

    constructor(){
        super("qrcode", "Vous génère un qrcode", "utils")

        this.setUsage("<data>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;

        message.author.send(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${escape(args.join(" "))}`).then(
            msg => EMBED.send("Le qrcode a bien été générer en privé", message.channel)).catch(
                err => EMBED.send("Je ne peux pas vous envoyé de message privé", message.channel));
    }
}

module.exports = QrCode;
