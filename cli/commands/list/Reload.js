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
        MAIN.LOGGER.cli(STYLE.createTitle("RELOAD", "*"));
        MAIN.LOGGER.cli(MAIN.COMMAND_MANAGER.reload() + " MODULES RELOADED");
        MAIN.LOGGER.cli(STYLE.createTitle("RELOAD COMPLETE", "*"));
    }
}

module.exports = Reload;