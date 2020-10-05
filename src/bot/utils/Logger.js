const COLORS = require("colors");
const FS = require("fs");
const CONFIG = require("./Config");
const DAY = require("dayjs");

class Logger {
    /**
     * @param {string} message the message to print
     * @description print a warn message in the console
     */

    warn(message){
        this.#log(message, 'WARN', 'red');
    }

    /**
     * @param {string} message the message to print
     * @description print a blue message in the console
     */

    info(message){
        this.#log(message, 'INFO', 'blue');
    }

    /**
     * @param {string} message the message to print
     * @description print a green message in the console
     */

    notice(message){
        this.#log(message, 'NOTICE', 'green');
    }

    /**
     * @param {string} message the message to print
     * @description print a yellow message in the console
     */

    cli(message){
        this.#log(message, 'CLI', 'yellow');
    }
    
    getDate(){
        let date = new Date();
        return `${date.getHours() > 9 ? date.getHours() : "0"+date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0"+date.getSeconds()}`;
    }

    #log = function(message, type, color){
        // Get and format the current date :
        let date = DAY().format("DD-MM-YYYY");

        // Define the path of logs :
        let logDir = __dirname + "/../../log/";
        let logPath = logDir + date + ".md";

        // Create the log dir if does not exist :
        if(!FS.existsSync(logDir)) FS.mkdirSync(logDir);

        // Format the message :
        let finalMessage = type != 'CLI' ? `[${this.getDate()}][${type}]: ${message}` : message;

        // Display the log in the console :
        MAIN.CLIENT.CLI.setPrompt("");
        MAIN.CLIENT.CLI.prompt(true);

        console.log(COLORS[color](finalMessage));
        
        MAIN.CLIENT.CLI.setPrompt("> ");
        MAIN.CLIENT.CLI.prompt(true);
        
        // Write the log in a file :
        CONFIG.writeText(logPath, finalMessage);
    }
}

module.exports = Logger;