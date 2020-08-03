const COLORS = require("colors");
const CONFIG = require("./Config");

class Logger {
    /**
     * @param {string} message the message to print
     * @description print a warn message in the console
     */

    warn(message){
        this.log(message, 'WARN', 'red');
    }

    /**
     * @param {string} message the message to print
     * @description print a blue message in the console
     */

    info(message){
        this.log(message, 'INFO', 'blue');
    }

    /**
     * @param {string} message the message to print
     * @description print a green message in the console
     */

    notice(message){
        this.log(message, 'NOTICE', 'green');
    }

    /**
     * @param {string} message the message to print
     * @description print a yellow message in the console
     */

    cli(message){
        this.log(message, 'CLI', 'yellow');
    }
    
    getDate(){
        let date = new Date();
        return `${date.getHours() > 9 ? date.getHours() : "0"+date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0"+date.getSeconds()}`;
    }

    log(message, type, color){
        let finalMessage = type != 'CLI' ? `[${this.getDate()}][${type}]: ${message}` : message;

        CLIENT.CLI.setPrompt("");
        CLIENT.CLI.prompt(true);

        console.log(COLORS[color](finalMessage));
        
        CLIENT.CLI.setPrompt("> ");
        CLIENT.CLI.prompt(true);
        
        CONFIG.writeText("./log/log.txt", finalMessage);
    }
}

module.exports = Logger;