CLIENT.on("message", (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(!message.content.startsWith(CLIENT.CONSTANTS.prefix)) return;

    let args = message.content.substring(1).split(" ");
    let commandName = args.shift().toLowerCase();
    let command = CLIENT.COMMANDMANAGER.get(commandName);

    if (command) {
        command.execute(args, message);
        CLIENT.LOGGER.info(`${message.author.tag} executed command: ${commandName.toLowerCase()}`);
    }
});