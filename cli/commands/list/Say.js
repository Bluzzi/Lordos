const CLICOMMAND = require("../CliCommand");

class Say extends CLICOMMAND {
    constructor(){
        super("say", "<channelID> <message>", "Send a discord message")
    }

    async execute(args){
        var channelID = args[0];
        var message = args.slice(1, args.length);
        if(!channelID || !message){
            return false;
        }

        var channel = CLIENT.channels.cache.get(channelID);
        if(channel){
            channel.send(message.join(" "));
            CLIENT.LOGGER.cli("Message sent in: " + channel.name);
        } else {
            CLIENT.LOGGER.cli("Cannot find channel " + channelID);
        }
    }
}

module.exports = Say;