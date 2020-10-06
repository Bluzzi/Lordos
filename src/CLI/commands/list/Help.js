const CLICOMMAND = require("../CliCommand");
const STYLE = require("../../utils/Style");

class Help extends CLICOMMAND {

    constructor(){
        super("help", "Give you the command list");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        BOT.LOGGER.cli(
            STYLE.createTitle("HELP PAGE") + "\n" + BOT.COMMAND_MANAGER.all(true).map(command => "[" + 
            command.getName() + "] | " + command.getUsage() + " | " + command.getDescription()).join("\n")
        );
    }
}

module.exports = Help;