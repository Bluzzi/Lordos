const CLICOMMAND = require("../CliCommand");
const FS = require("fs");

class ClearLog extends CLICOMMAND {
    
    constructor(){
        super("clearlog", "Clear log file");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        if(FS.existsSync("./log/log.txt")){
            FS.unlinkSync("./log/log.txt", (error) => {
                if(error) BOT.LOGGER.warn(error);
            });

            BOT.LOGGER.notice("Cleared log file !");
        } else {
            BOT.LOGGER.notice("There is not log file to clear.");
        }
    }
}

module.exports = ClearLog;