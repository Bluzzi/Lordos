const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/ColorConstants");

const { inspect } = require("util");

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
        if(!args[0]) return false;

        try {
            let result = inspect(eval(args.join(" "))).substr(0, 2000);

            EMBED.send("**RESULT :** ```JS\n" + result + "```", message.channel);
        } catch (error){
            EMBED.send("**ERROR :** ```JS\n" + error + "```", message.channel, COLOR.RED);
        }
    }
}

module.exports = Eval;