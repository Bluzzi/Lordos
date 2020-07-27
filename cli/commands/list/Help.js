const CLICOMMAND = require("../CliCommand");

class Help extends CLICOMMAND {
    constructor(){
        super("help", "", "Give you command list");
    }

    execute(args){
        CLIENT.LOGGER.cli("\n*************\n  HELP PAGE\n*************\n"+CLIENT.COMMANDMANAGER.all(true).map(command => "["+command.getName() + "] | " + command.getUsage() + "| " + command.getDescription()).join("\n"));
    }
}

module.exports = Help;