const CLICOMMAND = require("../CliCommand");

class Clear extends CLICOMMAND {
    constructor(){
        super("clear", "", "Clear the console");
    }

    execute(args){
        process.stdout.write("\x1Bc");
        CLIENT.LOGGER.cli("Cleared!");
    }
}

module.exports = Clear;