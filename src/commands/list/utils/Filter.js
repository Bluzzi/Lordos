const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const ZORO = require("zoro-api");
const EMBED = require("../../../utils/Embed");

const FILTERS = [
    "blur", "circle", "tv", "bw",
    "ps4", "gay", "pixel", "trash",
    "error", "triggered"
];

class Filter extends COMMAND {

    constructor(){
        super("filter", "Permet de voir l'avatar d'un membre du Discord avec un filtre", "utils");

        this.setUsage("(filtre, voici la liste des filtres possible : " + FILTERS.join(", ") + ") [mention]");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0] || !FILTERS.includes(args[0])) return false;

        let user = args[1] && message.mentions.users.first() ? 
            message.mentions.users.first() : message.author;

        EMBED.send(
            "Voici l'avatar de <@" + user.id + "> :", message.channel,
            {
                attachment: new DISCORD.MessageAttachment(
                    await ZORO[args[0]](user.displayAvatarURL().replace(".webp", ".png")), 
                    "avatar.png"
                )
            }
        );
    }
}

module.exports = Filter;