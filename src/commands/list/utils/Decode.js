const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");


class Encode extends COMMAND {

    constructor(){
        super("decode", "Décode une phrase", "utils");

        this.setUsage("<texte>");
    }

    execute(args, message){
        if(!args[1]) {
            EMBED.send(this.getUsage(), message.channel);
            console.log("bug")
            return;
        }
        
        let mode = args[0];
        args = args.splice(1);
        let text = ""
        
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
                EMBED.send(this.getUsage(), message.channel);
        }
    }

    bin2Text(str){
        return str.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    }
}

module.exports = Encode;