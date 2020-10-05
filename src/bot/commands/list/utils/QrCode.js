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

        let qrCodeContent = escape(args.join(" "));

        EMBED.send(
            "Voici votre QR code :", 
            message.channel, 
            {image: "http://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + qrCodeContent}
        );
    }
}

module.exports = QrCode;
