const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Encode extends COMMAND {

    constructor(){
        super("decode", "Décode une phrase", "utils");

        this.setUsage("<texte>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    execute(args, message){
        if(!args[1]) return false;
        
        let mode = args[0];

        args = args.splice(1);

        let text = "";
        
        switch(mode){
            case "base64":
                text = Buffer.from(args.join(" "), "base64").toString();
                EMBED.send(text, message.channel)
            break;
            
            case "binary":
                text = this.bin2Text(args.join(" "));
                EMBED.send(text, message.channel)
            break;
            
            default:
                return false;
            break;
        }
    }

    bin2Text(str){
        return str.split(" ").map(bin => String.fromCharCode(parseInt(bin, 2))).join("");
    }
}

module.exports = Encode;