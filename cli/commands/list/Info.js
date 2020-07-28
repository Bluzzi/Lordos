const CLICOMMAND = require("../CliCommand");
const STYLE = require("../../utils/Style");

class Info extends CLICOMMAND {
    constructor(){
        super("info", "", "get informations about the process/bot");
    }

    execute(args){
        CLIENT.LOGGER.cli(STYLE.createTitle("INFORMATION") + "\n[CPU USAGE]: " + process.cpuUsage().system+ " X??\n[MEMORY USAGE]: " + (process.memoryUsage().heapUsed/8)+ " bytes\n[GUILD SIZE]: " + CLIENT.guilds.cache.size);
    }
}

module.exports = Info;