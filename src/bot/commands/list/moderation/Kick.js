const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Kick extends COMMAND {

    constructor(){
        super("kick", "Kick un joueur du discord.", "moderation");

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

        console.log(user);
        if(!args[0] || !user) return false;

        if(user.id === message.author.id){
            return EMBED.send("**" + author + "**, vous ne pouvez pas vous kick vous-même.", message.channel);
        }

        user.kick(args.join(" ")).catch(() =>{
            return EMBED.send("**" + author + "**, vous ne pouvez pas kick cet utilisateur.", message.channel);
        });
        
        EMBED.send("<@!" + user + "> a bien été kick du discord !", message.channel);
    }
}

module.exports = Kick;