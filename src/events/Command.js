const EMBED = require("../utils/Embed");

CLIENT.on("message", (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(!message.content.startsWith(CLIENT.CONSTANTS.prefix)) return;

    let args = message.content.substring(1).split(" ");
    let commandName = args.shift().toLowerCase();
    let command = CLIENT.COMMANDMANAGER.get(commandName);

    if (command) {
        if(!message.member.permissions.has(command.getPermissions())) {
            return EMBED.send("Vous n'avez pas accès à cette commande !", message.channel, 'RED');
        }

        let execute = command.execute(args, message);
        if(execute == false) {
            EMBED.send(command.getUsage(), message.channel, 'RED');
        }

        CLIENT.LOGGER.info(`${message.author.tag} executed command: ${commandName.toLowerCase()}`);
    }
});