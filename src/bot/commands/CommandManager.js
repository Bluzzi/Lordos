const COMMAND = require("./Command");
const CLICOMMAND = require("../../CLI/commands/CliCommand");
const LOADER = require("./Loader");

class CommandManager extends LOADER {

    #commands = [];
    #cliCommands = [];

    /**
     * @param {Command} command 
     * @description add a command
     * @returns {void}
     */
    add(command, cli = false){
        if(!cli){
            this.#commands.push(command);
        } else {
            this.#cliCommands.push(command);
        }
    }

    /**
     * @param {String} commandName the command name
     * @description get a command
     * @returns {COMMAND|CLICOMMAND}
     */
    get(commandName, cli = false){
        let commands = cli == false ? this.#commands : this.#cliCommands;
        let command = commands.filter(command => command.getName() == commandName)[0];

        if(!command) command = commands.filter(command => command.getAliases().includes(commandName))[0];
        
        return command;
    }

    /**
     * @description get all registered commands by category
     * @returns {Array<COMMAND>}
     */
    getCategory(categoryName){
        let list = [];

        this.#commands.forEach(command => {
            if(command.getCategory() == categoryName) list.push(command);
        });

        return list;
    }

    /**
     * @description get all registered category
     * @return {Array<COMMAND>}
     */
    getCategoryList(){
        let list = [];

        this.#commands.forEach(command => {
            if(!list.includes(command.getCategory())) list.push(command.getCategory());
        });

        return list;
    }

    /**
     * @description get all registered commands
     * @returns {Array<COMMAND|CLICOMMAND>}
     */
    all(cli = false){
        return cli == false ? this.#commands : this.#cliCommands;
    }

    /**
     * @description reload all modules
     * @returns {Number} count of cleared modules
     */
    reload(){
        //DO NOT RELOAD THESES FILES: ./Command, ./CommandManager, ./CliCommand, ./Main

        let count = 0;
        this.#commands = [];
        this.#cliCommands = [];
        BOT.CLIENT.removeAllListeners(); //UNREGISTER ALL EVENTS
        process.removeAllListeners(); //UNREGISTER ALL PROCESS EVENTS

        //CLEAR MODULES:
        count += this.clear("./src/commands/list/", "./list/");
        count += this.clear("./src/utils/", "../utils/");
        count += this.clear("./src/events/", "../events/");
        count += this.clear("./src/music/", "../music/");
        count += this.clear("./cli/commands/list/", "../../cli/commands/list/");
        count += this.clear("./cli/utils/", "../../cli/utils/");
        count += this.clear("./resources/configs/", "../../resources/configs/");
        count += this.clear("./src/objects/", "../objects/");

        //LOAD COMMANDS:
        this.loadCommands(true);
        this.loadCommands(false);
        this.loadEvents();

        return count; //COUNT OF CLEARED MODULES
    }
}

module.exports = CommandManager;