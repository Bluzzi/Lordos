const CLICOMMAND = require("../CliCommand");

class Say extends CLICOMMAND {

    constructor(){
        super("say", "Send a discord message");

        this.setUsage("<channelID/userID> <message>");
    }

    /**
     * @param {string[]} args 
     */
    async execute(args){
        var ID = args[0];

        var message = args.slice(1, args.length);

        if(!ID || !message) return false;

        var channel = BOT.CLIENT.channels.cache.get(ID);
        var user = BOT.CLIENT.users.cache.get(ID);

        if(channel){
            channel.send(message.join(" "));
            BOT.LOGGER.cli("Message sent in: " + channel.name);
        } else if(user){
            user.send(message.join(" "));
            BOT.LOGGER.cli("Message sent to: " + user.tag);
        } else {
            BOT.LOGGER.cli("Cannot find channel/user: " + ID);
        }
    }
}

module.exports = Say;