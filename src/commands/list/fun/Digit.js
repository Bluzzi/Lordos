const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const COOL_DISCORD_THINGS = require("../../../utils/CoolDiscordThings");

class Digit extends COMMAND {

    constructor(){
        super("digit", "Affiche un nombre en emoji géant", "fun");

        this.setUsage("<nombre>");
    }

    async execute(args, message){
        if(isNaN(args[0]) || args[0].length > 6) return false;

        EMBED.send(COOL_DISCORD_THINGS.numberToDigitEmojis(args[0]), message.channel);
    }
}

module.exports = Digit;