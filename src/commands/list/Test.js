const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const DISCORD = require("discord.js");

class Test extends COMMAND {

    constructor(){
        super("test", "tkt", "utils");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        //TODO ...
    }
}

module.exports = Test;