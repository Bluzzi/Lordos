const CLICOMMAND = require("../CliCommand");
const FS = require("fs");

class ClearLog extends CLICOMMAND {
    constructor(){
        super("clearlog", "", "Clear log file");
    }

    execute(args){
        if(FS.existsSync("./log/log.txt")) {
            FS.unlinkSync("./log/log.txt", (error) => {
                if(error) CLIENT.LOGGER.warn(error);
            });

            CLIENT.LOGGER.notice("Cleared log file!");
        } else {
            CLIENT.LOGGER.notice("There is not log file to clear");
        }
    }
}

module.exports = ClearLog;