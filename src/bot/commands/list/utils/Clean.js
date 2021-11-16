const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const EMBED = require("../../../utils/Embed");

class Clean extends COMMAND {

    constructor(){
        super("clean", "Supprime un nombre de message", "utils");

        this.setAliases([]);
        this.setPermissions(["MANAGE_MESSAGES"]);
        this.setUsage("<nombre>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if (!args[0] || isNaN(args[0])) return false;

        if (args[0] > 100) {
            EMBED.reply("Vous pouvez supprimer 100 messages maximum", message);
            return;
        }

        message.channel.bulkDelete(parseInt(args[0]) + 1).catch(error => console.log(error));
        EMBED.reply(args[0] + " message(s) supprimé(s)", message).then(message => message.delete({timeout: 4000})).catch(error => console.log(error));
    }
}

module.exports = Clean;