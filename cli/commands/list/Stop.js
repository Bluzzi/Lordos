const CLICOMMAND = require("../CliCommand");

class Stop extends CLICOMMAND {
    constructor(){
        super("stop", "", "stop the bot")
    }

    execute(args){
        CLIENT.LOGGER.cli("Stopped the bot");
        process.exit(0);
    }
}

module.exports = Stop;