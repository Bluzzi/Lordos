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

        //Malheureusement cette commande est désactivé mais si tu souhaites la fixer, je t'invite à fixer les PATHS ici : src/bot/commands/CommandManager#reload

        BOT.LOGGER.info("Cette commande est désactivée pour le moment ! (Consultez le fichier de la commande)");

        /** 
         * BOT.LOGGER.cli(STYLE.createTitle("RELOAD", "*"));
         * BOT.LOGGER.cli(BOT.COMMAND_MANAGER.reload() + " MODULES RELOADED");
         * BOT.LOGGER.cli(STYLE.createTitle("RELOAD COMPLETE", "*"));
         */
    }
}

module.exports = Reload;