const CLICOMMAND = require("../CliCommand");

class Clear extends CLICOMMAND {

    constructor(){
        super("clear", "Clear the console");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        MAIN.CLIENT.CLI.write("\x1Bc");
        MAIN.LOGGER.cli("Cleared !");
        MAIN.CLIENT.CLI.setPrompt("> ");
        MAIN.CLIENT.CLI.prompt(true);
    }
}

module.exports = Clear;