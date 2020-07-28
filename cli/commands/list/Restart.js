const CLICOMMAND = require("../CliCommand");
const STYLE = require("../../utils/Style");

class Reload extends CLICOMMAND {
    constructor(){
        super("reload", "", "Reload commands & events")
    }

    execute(args){
        CLIENT.LOGGER.cli(STYLE.createTitle("RELOAD", "*"));
        CLIENT.LOGGER.cli(CLIENT.COMMANDMANAGER.reload() + " MODULES RELOADED");
        CLIENT.LOGGER.cli(STYLE.createTitle("RELOAD COMPLETE", "*"));
    }
}

module.exports = Reload;