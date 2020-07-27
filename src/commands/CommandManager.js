const COMMAND = require("./Command");

class CommandManager {
    constructor(){
        this.commands = [];
    }

    /**
     * @param {Command} command 
     * @description add a command
     * @returns {void}
     */

    add(command){
        this.commands.push(command);
    }

    /**
     * @param {String} commandName the command name
     * @description get a command
     * @returns {COMMAND}
     */

    get(commandName){
        let list = this.commands.map(command => command.getName());
        let index = list.indexOf(commandName);
        if (index < 0) {
            list = this.commands.map(command => command.getAlias());
            index = list.indexOf(commandName);
        }
        
        return this.commands[index];
    }

    /**
     * @description get all registered commands
     * @returns {Array<COMMAND>}
     */

    all(){
        return this.commands;
    }
}

module.exports = CommandManager;