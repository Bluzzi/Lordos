const CLICOMMAND = require("../CliCommand");

class Clear extends CLICOMMAND {

    constructor(){
        super("clear", "Clear the console");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        BOT.CLIENT.CLI.write("\x1Bc");
        BOT.LOGGER.cli("Cleared !");
        BOT.CLIENT.CLI.setPrompt("> ");
        BOT.CLIENT.CLI.prompt(true);
    }
}

module.exports = Clear;