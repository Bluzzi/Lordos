const READLINE = require("readline");
const COMPLETER = function(line) {
    let completions = CLIENT.COMMANDMANAGER.all(true).map(command => command.getName());
    let find = completions.filter((c) => c.startsWith(line));

    return [find.length ? find : completions, line];
}
const READER = READLINE.createInterface(process.stdin, process.stdout, COMPLETER);

function start(){
    initPrompt();


    // COMMAND:
    READER.on("line", async (input) => {
        let args = input.toLowerCase().split(" ");
        let commandName = args[0];
        args = args.slice(1, args.length);
        let command = CLIENT.COMMANDMANAGER.get(commandName, true);
    
        if(command){
            let execute = await command.execute(args);
            if(execute == false){
                CLIENT.LOGGER.cli("Invalid usage, try : " + command.getUsage());
            }
        } else if(commandName.length > 0) {
            CLIENT.LOGGER.cli("Undefined command, try 'help' to get the command list");
        }

        initPrompt();
    });


    // PREVENT UNDESIRED CLOSE:
    READER.on("SIGINT", () => {
        READER.question("You are about to close this session, are you sure ? (no/YES) : ", (answer) => {
            if(answer == "no"){
                READER.resume();
            } else {
                READER.close();
                process.exit(0);
            }
        })
    })

    return READER;
}

function initPrompt(){
    READER.setPrompt("> ");
    READER.prompt(true);
};

module.exports.READER = READER;
module.exports.start = start;
