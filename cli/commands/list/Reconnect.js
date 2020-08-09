const CLICOMMAND = require("../CliCommand");

class Info extends CLICOMMAND {

    constructor(){
        super("reconnect", "Reconnect the bot to the API");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        MAIN.CLIENT.destroy();
        
        MAIN.LOGGER.cli("Destroyed DISCORD API connection ! Reconnecting...");

        MAIN.CLIENT.login(MAIN.CONSTANTS.token).then(() => {
            MAIN.LOGGER.cli("Reconnected to the DISCORD API !");
        });
    }
}

module.exports = Info;