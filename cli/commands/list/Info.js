const CLICOMMAND = require("../CliCommand");

class Info extends CLICOMMAND {
    constructor(){
        super("info", "", "get informations about the process/bot");
    }

    execute(args){
        CLIENT.LOGGER.cli("\n*****************\n   Information   \n*****************\n[CPU USAGE]: " + process.cpuUsage().system+ " X??\n[MEMORY USAGE]: " + (process.memoryUsage().heapUsed/8)+ " bytes\n[GUILD SIZE]: " + CLIENT.guilds.cache.size);
    }
}

module.exports = Info;