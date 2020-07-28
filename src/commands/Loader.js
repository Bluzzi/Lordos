const FS = require("fs");
const COMMAND = require("./Command");
const CLICOMMAND = require('../../cli/commands/CliCommand');

class Loader {
    loadCommands(cli = false){
        let path = cli == false ? "./src/commands/list/" : "./cli/commands/list/";
        let pathTwo = cli == false ? "./list/" : "../../cli/commands/list/";
        let classType = cli == false ? COMMAND : CLICOMMAND;
        let count = 0;

        FS.readdirSync(path).forEach(commandName => {
            if(commandName.split(".").pop() == "js"){ //only reads JS files
                let commandClass = require(pathTwo + commandName);
                let type = cli == false ? "bot" : "CLI";

                if(typeof commandClass == "function") { //prevent 'no exports'
                    commandClass = new commandClass();
                    if(commandClass instanceof classType){ //prevent 'no command class'
                        CLIENT.LOGGER.notice("Loaded " + type + " command: " + commandName);
                        CLIENT.COMMANDMANAGER.add(commandClass, cli);
                        count++;
                    } else {
                        CLIENT.LOGGER.warn("Cannot load" + type + " command: " + commandName + "(not a command instance)");
                    }
                } else {
                    CLIENT.LOGGER.warn("Cannot load " + type + " command: " + commandName + " (missing exports?)");
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
                CLIENT.LOGGER.notice("Loaded event: " + eventName);
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
                CLIENT.LOGGER.notice("Cleared module: " + moduleName);
                count++;
            }
        });

        return count;
    }
}

module.exports = Loader;