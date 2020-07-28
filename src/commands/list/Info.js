const COMMAND = require("../Command");

class Info extends COMMAND {
    constructor(){
        super("info", "", "Donne les informations concernants le bot");
    }

    execute(args, message){
        
    }
}

module.exports = Info;