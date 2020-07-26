const COLORS = require("colors");

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

    notice(message) {
        this.log(message, 'NOTICE', 'green');
    }
    
    getDate(){
        let date = new Date();
        return `${date.getHours() > 9 ? date.getHours() : "0"+date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0"+date.getSeconds()}`;
    }

    log(message, type, color) {
        let finalMessage = `[${this.getDate()}][${type}]: ${message}`;
        console.log(COLORS[color](finalMessage));
    }
}

module.exports = Logger;