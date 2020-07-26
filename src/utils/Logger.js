const COLORS = require("colors");

class Logger {
    /**
     * @param {string} message the message to print
     * @description print a warn message in the console
     */


    warn(message){
        this.log(message, 'red');
    }

    /**
     * @param {string} message the message to print
     * @description print a blue message in the console
     */

    info(message){
        this.log(message, 'blue');
    }

    /**
     * @param {string} message the message to print
     * @description print a green message in the console
     */

    notice(message) {
        this.log(message, 'green');
    }
    
    getDate(){
        let date = new Date();
        return `${date.getHours() > 9 ? date.getHours() : "0"+date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0"+date.getSeconds()}`;
    }

    log(message, color) {
        console.log(COLORS[color](`[${this.getDate()}] : ${message}`));
    }
}

module.exports = Logger;