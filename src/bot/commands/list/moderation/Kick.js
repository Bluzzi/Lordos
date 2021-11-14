const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Kick extends COMMAND {

    constructor(){
        super("kick", "Kick un utilisateur.", "moderation");

        this.setUsage("<mention> <raison>");
        this.setPermissions(["KICK_MEMBERS"]);
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
            return EMBED.send("**" + author + "**, vous ne pouvez pas vous kick vous-même.", message.channel);
        }

        user.kick(args.join(" "))
        .then(() => EMBED.send("<@!" + user + "> a bien été kick du discord !", message.channel), EMBED.send("Je n'ai pas la permission de faire cela.", message.channel))
        .catch(error => {});
    }
}

module.exports = Kick;