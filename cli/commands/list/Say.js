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

        var channel = MAIN.CLIENT.channels.cache.get(ID);
        var user = MAIN.CLIENT.users.cache.get(ID)
        if(channel){
            channel.send(message.join(" "));
            MAIN.LOGGER.cli("Message sent in: " + channel.name);
        } else if(user){
            user.send(message.join(" "));
            MAIN.LOGGER.cli("Message sent to: " + user.tag);
        } else {
            MAIN.LOGGER.cli("Cannot find channel/user: " + ID);
        }
    }
}

module.exports = Say;