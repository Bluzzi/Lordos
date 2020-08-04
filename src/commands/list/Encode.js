const base64 = require("Base64");
const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");


class Encode extends COMMAND {

    constructor(){
        super("encode", "base64 | binary", "Encoder une phrase.", []);
    }

    execute(args, message){
        if(!args[1]) {
            EMBED.send(this.getUsage(), message.channel);
            return;
        }
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
                EMBED.send(this.getUsage(), message.channel);
        }
    }

    text2Binary(string) {
        return string.split('').map(function (char) {
            return char.charCodeAt(0).toString(2);
        }).join(' ');
    }
}

module.exports = Encode;