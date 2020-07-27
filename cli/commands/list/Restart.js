const CLICOMMAND = require("../CliCommand");
const CHILD_PROCESS = require("child_process");

class Restart extends CLICOMMAND {
    constructor(){
        super("restart", "", "restart the bot")
    }

    execute(args){
        CLIENT.LOGGER.cli("NOT AVAILABLE");
    }
}

module.exports = Restart;