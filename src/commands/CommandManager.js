const COMMAND = require("./Command");
const CLICOMMAND = require("../../cli/commands/CliCommand");
const LOADER = require("./Loader");

class CommandManager extends LOADER {
    constructor(){
        super();
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

    /**
     * @description reload all modules
     * @returns {Number} count of cleared modules
     */

    reload(){
        //DO NOT RELOAD THIS PATH AND THESES CLASSES ./Command AND ./CliCommand

        let count = 0;
        this._commands = [];
        this._cliCommands = [];

        //CLEAR MODULES:
        count += this.clear("./src/commands/list", "./list/");
        count += this.clear("./src/utils/", "../utils/");
        count += this.clear("./src/game/", "../game/");
        count += this.clear("./src/events/", "../events/");
        count += this.clear("./cli/commands/list", "../../cli/commands/list/");
        count += this.clear("./cli/utils", "../../cli/utils/");

        //LOAD COMMANDS:
        this.loadCommands(true);
        this.loadCommands(false);
        this.loadEvents();

        return count; //COUNT OF CLEARED MODULES
    }
}

module.exports = CommandManager;