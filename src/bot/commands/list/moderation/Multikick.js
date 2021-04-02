const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const EMBED = require("../../../utils/Embed");


class Multikick extends COMMAND {

    constructor(){
        super("multikick", "Kick plusieurs utilisateur en même temps.", "moderation");

        this.setAliases([]);
        this.setPermissions(["KICK_MEMBERS"]);
        this.setUsage("<mention> ...[mention]");
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
                return EMBED.send("**" + author + "**, vous ne pouvez pas vous kick vous-même.", message.channel);
            }
        }

        users.forEach((user) => {
            user.kick(args.join(" "))
            .then(() => EMBED.send("<@!" + user + "> a bien été kick du discord !", message.channel), EMBED.send("Je n'ai pas la permission de faire cela.", message.channel))
            .catch(error => {});
        })
    }
}

module.exports = Multikick;