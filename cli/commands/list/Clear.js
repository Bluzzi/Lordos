const CLICOMMAND = require("../CliCommand");

class Clear extends CLICOMMAND {
    constructor(){
        super("clear", "", "Clear the console");
    }

    execute(args){
        CLIENT.CLI.write("\x1Bc");
        CLIENT.LOGGER.cli("Cleared!");
        CLIENT.CLI.setPrompt("> ");
        CLIENT.CLI.prompt(true);
    }
}

module.exports = Clear;