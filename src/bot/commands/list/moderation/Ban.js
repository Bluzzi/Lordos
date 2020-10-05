const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Ban extends COMMAND {

    constructor(){
        super("ban", "Bannir un joueur du discord.", "moderation");

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
            return EMBED.send("**" + author + "**, vous ne pouvez pas vous bannir vous-même.", message.channel);
        }

        user.ban(args.join(" ")).catch(() =>{
            return EMBED.send("**" + author + "**, vous ne pouvez pas bannir cet utilisateur.", message.channel);
        });
        
        EMBED.send("<@!" + user + "> a bien été banni du discord !", message.channel);
    }
}

module.exports = Ban;