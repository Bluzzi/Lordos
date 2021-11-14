const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const EMBED = require("../../../utils/Embed");

class Rename extends COMMAND {

    constructor(){
        super("rename", "Renommer un utilisateur.", "moderation");

        this.setAliases(["nick"]);
        this.setPermissions(["MANAGE_NICKNAMES"]);
        this.setUsage("<user> <name>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let user = message.mentions.users.first();
        if(!user || !args[1]) return false;

        let username = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).setNickname(username)
        .then(() => EMBED.send("Le pseudo de **" + user.username + "#" + user.discriminator + "** à bien été changé en **\"" + username + "\"**.", message.channel), EMBED.send("Je n'ai pas la permission de faire cela.", message.channel))
        .catch(error => {});
    }
}

module.exports = Rename;