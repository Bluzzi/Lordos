const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Test extends COMMAND {

    constructor(){
        super("test", "tkt", "utils");
    }

    execute(args, message){
        message.channel.send("Ceci est un test !");
    }
}

module.exports = Test;