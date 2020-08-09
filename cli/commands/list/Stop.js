const CLICOMMAND = require("../CliCommand");

class Stop extends CLICOMMAND {

    constructor(){
        super("stop", "Stop the bot");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        MAIN.LOGGER.cli("Stopped the bot");

        process.exit(0);
    }
}

module.exports = Stop;