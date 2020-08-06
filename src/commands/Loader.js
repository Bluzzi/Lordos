const FS = require("fs");
const COMMAND = require("./Command");
const CLICOMMAND = require('../../cli/commands/CliCommand');

class Loader {
    loadCommands(cli = false, path = null, pathTwo = null){
        if(path == null) path = cli == false ? "./src/commands/list/" : "./cli/commands/list/";
        if(pathTwo == null) pathTwo = cli == false ? "./list/" : "../../cli/commands/list/";
        let classType = cli == false ? COMMAND : CLICOMMAND;
        let count = 0;

        FS.readdirSync(path).forEach((moduleName) => {
            if(moduleName.split(".").pop() == "js"){ //READ JS FILES
                let commandClass = require(pathTwo + moduleName);
                let type = cli == false ? "bot" : "CLI";
                
                if(typeof commandClass == "function"){ //prevents 'not a constructor' error
                    commandClass = new commandClass();
                    if(commandClass instanceof classType){ //only register commands
                        MAIN.LOGGER.notice("Loaded " + type + " command: " + moduleName);
                        MAIN.COMMAND_MANAGER.add(commandClass, cli);
                        count++;
                    } else {
                        MAIN.LOGGER.warn("Cannot load " + type + " command: " + moduleName + " (not a command instance)");
                    }
                } else {
                    MAIN.LOGGER.warn("Cannot load " + type + " command: " + moduleName + " (missing exports?)");
                }
            } else { //READ DIRECTORIES
                if(!cli){
                    if(FS.lstatSync(path + "/" + moduleName).isDirectory()) count += this.loadCommands(false, path + "/" + moduleName + "/", pathTwo + "/" + moduleName + "/");
                }
            }
        });

        return count;
    }

    loadEvents(){
        let path = "./src/events/";
        let count = 0;

        FS.readdirSync(path).forEach(eventName => {
            if(eventName.split(".").pop() == "js"){
                require("../events/" + eventName);
                MAIN.LOGGER.notice("Loaded event: " + eventName);
                count++;
            }
        });

        return count;
    }

    /**
     * @param {String} path path for FileSystem
     * @param {String} pathTwo path for require()
     * @returns {Number} count of cleared modules
     */

    clear(path, pathTwo){
        let count = 0;
        FS.readdirSync(path).forEach(moduleName => {
            if(moduleName.split(".").pop() == "js"){
                delete require.cache[require.resolve(pathTwo+moduleName)];
                MAIN.LOGGER.notice("Cleared module: " + moduleName);
                count++;
            } else {
                if(FS.lstatSync(path + moduleName + "/").isDirectory()) count += this.clear(path + moduleName + "/", pathTwo + moduleName + "/");
            }
        });

        return count;
    }
}

module.exports = Loader;