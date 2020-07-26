class CommandManager {
    constructor(){
        this.commands = [];
    }

    /**
     * @param {Command} command 
     * @description add a command
     */

    add(command){
        this.commands.push(command);
    }

    /**
     * @param {String} commandName the command name
     * @description get a command
     * @returns {Command}
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
}

module.exports = CommandManager;