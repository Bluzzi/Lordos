const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const jQuery = require("jquery")
class Loupio extends COMMAND {

    constructor(){
        super("loupio", "", "Tout ce que vous devez savoir sur Loupio", []);
    }

    execute(args, message){
        //message.channel.send("Tantôt... A faire");
    }

    
}

module.exports = Loupio;