const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const COOL_DISCORD_THINGS = require("../../../utils/CoolDiscordThings");


class Digit extends COMMAND {
    constructor() {
        super("digit", "number(< 999999)", "");
    }

    async execute(args, message){
        if(isNaN(args[0]) || args[0].length > 6){
            EMBED.send(this.getUsage(), message.channel);
            return;
        }
        let text = COOL_DISCORD_THINGS.numberToDigitEmojis(args[0]);
        
        EMBED.send(text, message.channel);
    }
}

module.exports = Digit;