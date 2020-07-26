const { inspect } = require("util");
const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Eval extends COMMAND {
    constructor(){
        super("eval", "<query>", "execute", ["ADMINISTRATOR"]);
    }

    execute(args, message){
        if(!args[0]) {
            return false;
        } else {
            var query = args.slice(0, args.length);
            var result;
            try {
                result = eval(query.join(" "));
                EMBED.send("```JS\n"+inspect(result)+"```", message.channel, 'GREEN');
            } catch (err) {
                EMBED.send("ERROR: ```JS\n"+inspect(err)+"```", message.channel, 'RED');
            }
        }
    }
}

module.exports = Eval;