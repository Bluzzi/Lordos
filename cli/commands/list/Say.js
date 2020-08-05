const CLICOMMAND = require("../CliCommand");

class Say extends CLICOMMAND {
    constructor(){
        super("say", "<channelID/userID> <message>", "Send a discord message")
    }

    async execute(args){
        var ID = args[0];
        var message = args.slice(1, args.length);
        if(!ID || !message){
            return false;
        }

        var channel = CLIENT.channels.cache.get(ID);
        var user = CLIENT.users.cache.get(ID)
        if(channel){
            channel.send(message.join(" "));
            CLIENT.LOGGER.cli("Message sent in: " + channel.name);
        } else if(user){
            user.send(message.join(" "));
            CLIENT.LOGGER.cli("Message sent a: " + user.tag);
        } else {
            CLIENT.LOGGER.cli("Cannot find channel " + channel);
        }
    }
}

module.exports = Say;