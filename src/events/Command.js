const FS = require("fs");
const CONSTANTS = require("../utils/Constants");

CLIENT.on("message", (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(CONSTANTS.prefix)) return;

    let args = message.content.substring(1).split(" ");
    let command = args.shift().toLowerCase();

    FS.readdirSync(__dirname + "/../commands/").map(cN => cN.substring(0, cN.length - 3)).forEach(className => {
        if(command === className.toLowerCase()){
            let commandClass = require(__dirname + "/../commands/" + className);

            commandClass.execute(args, message);
        }
    });
});