const READLINE = require("readline");
const READER = READLINE.createInterface(process.stdin, process.stdout);

function start(){
    initPrompt();

    READER.on("line", async (input) => {
        let args = input.toLowerCase().split(" ");
        let commandName = args[0];
        args = args.slice(1, args.length-1);
        let command = CLIENT.COMMANDMANAGER.get(commandName, true);
    
        if(command){
            let execute = await command.execute(args);
            if(execute == false){
                CLIENT.LOGGER.cli("Invalid usage, try : " + command.getUsage());
            }
        } else {
            CLIENT.LOGGER.cli("Undefined command, try 'help' to get the command list");
        }

        initPrompt();
    });

    return READER;
}

function initPrompt(){
    READER.setPrompt("> ");
    READER.prompt(true);
};

module.exports.READER = READER;
module.exports.start = start;
