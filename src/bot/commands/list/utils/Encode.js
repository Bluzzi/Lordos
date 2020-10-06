const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Encode extends COMMAND {

    constructor(){
        super("encode", "Encode un texte", "utils");

        this.setUsage("<texte>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    execute(args, message){
        if(!args[1]) return false;

        let mode = args[0];

        args = args.splice(1)
        
        let text = "";

        switch(mode){
            case "base64":
                text = Buffer.from(args.join(" ")).toString("base64");

                EMBED.send(text, message.channel)
            break;
            
            case "binary":
                text = this.text2Binary(args.join(" "));
                EMBED.send(text, message.channel)
            break;
            
            default:
                return false;
            break;
        }
    }

    text2Binary(string) {
        return string.split("").map(char => char.charCodeAt(0).toString(2)).join(" ");
    }
}

module.exports = Encode;