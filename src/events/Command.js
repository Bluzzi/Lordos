const FS = require("fs");

CLIENT.on("message", (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(!message.content.startsWith(CLIENT.CONSTANTS.prefix)) return;

    let args = message.content.substring(1).split(" ");
    let command = args.shift().toLowerCase();

    FS.readdirSync(__dirname + "/../commands/").map(cN => cN.substring(0, cN.length - 3)).forEach(className => {
        if(command === className.toLowerCase()){
            let commandClass = require(__dirname + "/../commands/" + className);

            if(typeof commandClass.execute == "function") { //prevent invalid commands
                commandClass.execute(args, message);
                CLIENT.LOGGER.info(`${message.author.tag} executed command: ${className.toLowerCase()}`);
            } else {
                CLIENT.LOGGER.warn(`Missing 'execute' method in ${className}`);
            }
        }
    });
});