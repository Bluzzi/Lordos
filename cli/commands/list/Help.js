const CLICOMMAND = require("../CliCommand");
const STYLE = require("../../utils/Style");

class Help extends CLICOMMAND {
    constructor(){
        super("help", "", "Give you the command list");
    }

    execute(args){
        CLIENT.LOGGER.cli(STYLE.createTitle("HELP PAGE")+"\n"+CLIENT.COMMANDMANAGER.all(true).map(command => "["+command.getName() + "] | " + command.getUsage() + " | " + command.getDescription()).join("\n"));
    }
}

module.exports = Help;