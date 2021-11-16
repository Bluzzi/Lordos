const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Ban extends COMMAND {

    constructor(){
        super("ban", "Bannir un utilisateur.", "moderation");

        this.setUsage("<mention> <raison>");
        this.setPermissions(["BAN_MEMBERS"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        args = args.slice(1, args.length);

        let author = message.author.username;

        let user = message.mentions.members.first();

        if(!args[0] || !user) return false;

        if(user.id === message.author.id){
            return EMBED.reply("**" + author + "**, vous ne pouvez pas vous bannir vous-même.", message);
        }

        user.ban(args.join(" "))
        .then(() => EMBED.reply("<@!" + user + "> a bien été banni du discord !", message), EMBED.reply("Je n'ai pas la permission de faire cela.", message))
        .catch(error => {});
    }
}

module.exports = Ban;