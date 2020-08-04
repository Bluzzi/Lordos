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
        var commands = cli == false ? this._commands : this._cliCommands;
        var command = commands.filter(command => command.getName() == commandName)[0];
        if(!command){
            command = commands.filter(command => command.getAliases().includes(commandName))[0];
        }
        
        console.log(command);
        return command;
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
        CLIENT.removeAllListeners(); //UNREGISTER ALL EVENTS

        //CLEAR MODULES:
        count += this.clear("./src/commands/list", "./list/");
        count += this.clear("./src/utils/", "../utils/");
        count += this.clear("./src/events/", "../events/");
        count += this.clear("./cli/commands/list", "../../cli/commands/list/");
        count += this.clear("./cli/utils", "../../cli/utils/");
        count += this.clear("./resources/configs", "../../resources/configs/");
        count += this.clear("./src/objects/", "../objects/");

        //LOAD COMMANDS:
        this.loadCommands(true);
        this.loadCommands(false);
        this.loadEvents();

        return count; //COUNT OF CLEARED MODULES
    }
}

module.exports = CommandManager;