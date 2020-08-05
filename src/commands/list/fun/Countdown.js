const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const COOL_DISCORD_THINGS = require("../../../utils/CoolDiscordThings");

class Countdown extends COMMAND {

    constructor(){
        super("countdown", "Créé un minuteur", "fun");

        this.setUsage("<secondes>");
    }

    async execute(args, message){
        if(isNaN(args[0])){
            return false;
        }
        let time = args[0];
        let text = "";
        EMBED.send(COOL_DISCORD_THINGS.numberToDigitEmojis(time), message.channel).then((msg) => {
            let interval = setInterval(()=>{
                time -= 1;
                text = COOL_DISCORD_THINGS.numberToDigitEmojis(time);
                
                if(time == 0) clearInterval(interval);
                
                msg.edit(new DISCORD.MessageEmbed().setDescription(text).setColor(EMBED.COLOR_GREEN));
            }, 1000)
        })
    }
}

module.exports = Countdown;