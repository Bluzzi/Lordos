const CLICOMMAND = require("../CliCommand");

class Info extends CLICOMMAND {
    constructor(){
        super("reconnect", "", "Reconnect the bot to the API");
    }

    execute(args){
        CLIENT.destroy();
        CLIENT.LOGGER.cli("Destroyed DISCORD API connection ! Reconnecting...");
        CLIENT.login(CLIENT.CONSTANTS.token).then(() => {
            CLIENT.LOGGER.cli("Reconnected to the DISCORD API !");
        });
    }
}

module.exports = Info;