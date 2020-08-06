const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const COOL_DISCORD_THINGS = require("../../../utils/CoolDiscordThings");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/Color");

class Countdown extends COMMAND {

    constructor(){
        super("countdown", "Créé un minuteur", "fun");

        this.setUsage("<secondes>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(isNaN(args[0])) return false;

        let time = args[0];
        let text = "";

        EMBED.send(COOL_DISCORD_THINGS.numberToDigitEmojis(time), message.channel).then(msg => {
            let interval = setInterval(() => {
                text = COOL_DISCORD_THINGS.numberToDigitEmojis(time);
                time -= 1;
                
                if(time == 0) clearInterval(interval);
                
                msg.edit(new DISCORD.MessageEmbed().setDescription(text).setColor(COLOR.GREEN));
            }, 1000)
        })
    }
}

module.exports = Countdown;