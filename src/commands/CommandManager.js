const COMMAND = require("./Command");
const CLICOMMAND = require("../../cli/commands/CliCommand");


class CommandManager {
    constructor(){
        this._commands = [];
        this._cliCommands = [];
    }

    /**
     * @param {Command} command 
     * @description add a command
     * @returns {void}
     */

    add(command, cli = false){
        if(!cli) {
            this._commands.push(command);
        } else {
            this._cliCommands.push(command);
        }
    }

    /**
     * @param {String} commandName the command name
     * @description get a command
     * @returns {COMMAND|CLICOMMAND}
     */

    get(commandName, cli = false){
        let commands = cli == false ? this._commands : this._cliCommands;
        let list = commands.map(command => command.getName());
        let index = list.indexOf(commandName);
        if (index < 0) {
            list = commands.map(command => command.getAlias());
            index = list.indexOf(commandName);
        }
        
        return commands[index];
    }

    /**
     * @description get all registered commands
     * @returns {Array<COMMAND|CLICOMMAND>}
     */

    all(cli = false){
        return cli == false ? this._commands : this._cliCommands;
    }
}

module.exports = CommandManager;