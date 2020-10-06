const CLICOMMAND = require("../CliCommand");

class Info extends CLICOMMAND {

    constructor(){
        super("reconnect", "Reconnect the bot to the API");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        BOT.CLIENT.destroy();
        
        BOT.LOGGER.cli("Destroyed DISCORD API connection ! Reconnecting...");

        BOT.CLIENT.login(BOT.CONSTANTS.token).then(() => {
            BOT.LOGGER.cli("Reconnected to the DISCORD API !");
        });
    }
}

module.exports = Info;