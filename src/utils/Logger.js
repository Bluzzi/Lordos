const COLORS = require("colors");

class Logger {
    warn(message){
        console.log(COLORS.red(`[${this.getDate()}] [WARNING] : ${message}`));
    }

    info(message){
        console.log(COLORS.blue(`[${this.getDate()}] [INFO] : ${message}`));
    }
    
    getDate(){
        let date = new Date();
        return `${date.getHours() > 9 ? date.getHours() : "0"+date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0"+date.getSeconds()}`;
    }
}

module.exports = Logger;