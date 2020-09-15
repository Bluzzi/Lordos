const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/Color");
const CONSTANTS = require("../../../utils/Constants");

class Creators extends COMMAND {

    constructor(){
        super("creators", "Permet d'obtenir la liste des créateurs de ce bot", "information");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let embed = new DISCORD.MessageEmbed();
        
        embed.setTitle("Liste des créateurs du bot");
        embed.setColor(COLOR.GREEN);

        let description = "";

        let admins = await CONSTANTS.getAdmins();

        admins.forEach(teamMember => description += teamMember.user.tag + "\n\n");

        embed.setDescription(description);

        message.channel.send(embed);    
    }
}

module.exports = Creators;