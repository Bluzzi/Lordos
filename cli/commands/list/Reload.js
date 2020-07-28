const CLICOMMAND = require("../CliCommand");
const STYLE = require("../../utils/Style");

class Reload extends CLICOMMAND {
    constructor(){
        super("reload", "", "Reload all project modules")
    }

    execute(args){
        CLIENT.LOGGER.cli(STYLE.createTitle("RELOAD", "*"));
        CLIENT.LOGGER.cli(CLIENT.COMMANDMANAGER.reload() + " MODULES RELOADED");
        CLIENT.LOGGER.cli(STYLE.createTitle("RELOAD COMPLETE", "*"));
    }
}

module.exports = Reload;