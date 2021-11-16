const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const EMBED = require("../../../utils/Embed");

class CreateInvite extends COMMAND {

    constructor(){
        super("createinvite", "Vous génère une invitation de bot", "utils");

        this.setAliases([]);
        this.setPermissions([]);
        this.setUsage("<bot id>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if (!args[0] || args[0].length != 18) return false;

        EMBED.reply("**Voici le [lien](https://discord.com/oauth2/authorize?client_id=" + args[0] + "&scope=bot&permissions=2046295295) pour rajouter le bot :**\n\nhttps://discord.com/oauth2/authorize?client_id=" + args[0] + "&scope=bot&permissions=2046295295", message)
    }
}

module.exports = CreateInvite;