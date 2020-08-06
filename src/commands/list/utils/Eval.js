const { inspect } = require("util");
const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/Color");

class Eval extends COMMAND {

    constructor(){
        super("eval", "Executer un code", "utils");

        this.setPermissions(["BOT.ADMINISTRATOR"]);
        this.setUsage("<code>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) {
            return false;
        } else {
            var query = args.slice(0, args.length);
            var result;

            try {
                result = eval(query.join(" "));
                
                EMBED.send("```JS\n"+inspect(result)+"```", message.channel);
            } catch (err){
                EMBED.send("ERROR: ```JS\n"+inspect(err)+"```", message.channel, COLOR.RED);
            }
        }
    }
}

module.exports = Eval;