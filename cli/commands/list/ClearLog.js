const CLICOMMAND = require("../CliCommand");
const FS = require("fs");

class ClearLog extends CLICOMMAND {
    
    constructor(){
        super("clearlog", "", "Clear log file");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        if(FS.existsSync("./log/log.txt")) {
            FS.unlinkSync("./log/log.txt", (error) => {
                if(error) MAIN.LOGGER.warn(error);
            });

            MAIN.LOGGER.notice("Cleared log file!");
        } else {
            MAIN.LOGGER.notice("There is not log file to clear");
        }
    }
}

module.exports = ClearLog;