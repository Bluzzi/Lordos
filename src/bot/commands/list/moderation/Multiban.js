const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Multiban extends COMMAND {

    constructor(){
        super("multiban", "Bannir plusieurs utilisateur en même temps.", "moderation");

        this.setUsage("<mention> ...[mention]");
        this.setPermissions(["BAN_MEMBERS"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;

        let author = message.author.username;
        let users = message.mentions.members;

        for(let user of users){
            if(user.id === message.author.id){
                return EMBED.reply("**" + author + "**, vous ne pouvez pas vous bannir vous-même.", message);
            }
        }

        users.forEach((user) => {
            user.ban(args.join(" "))
            .then(() => EMBED.reply("<@!" + user + "> a bien été banni du discord !", message), EMBED.reply("Je n'ai pas la permission de faire cela.", message))
            .catch(error => {});
        })
    }
}

module.exports = Multiban;