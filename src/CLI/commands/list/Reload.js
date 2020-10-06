const CLICOMMAND = require("../CliCommand");
const STYLE = require("../../utils/Style");

class Reload extends CLICOMMAND {

    constructor(){
        super("reload", "Reload all project modules");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        BOT.LOGGER.cli(STYLE.createTitle("RELOAD", "*"));
        BOT.LOGGER.cli(BOT.COMMAND_MANAGER.reload() + " MODULES RELOADED");
        BOT.LOGGER.cli(STYLE.createTitle("RELOAD COMPLETE", "*"));
    }
}

module.exports = Reload;