const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const COLOR = require("../../../utils/ColorConstants");
const CONSTANTS = require("../../../utils/Constants");

class Creators extends COMMAND {

    constructor(){
        super("creators", "Permet d'obtenir la liste des créateurs de ce bot", "information");

        this.setAliases(["owners", "owner", "authors"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let embed = new DISCORD.MessageEmbed();
        
        embed.setTitle("Liste des créateurs du bot");
        embed.setColor(COLOR.GREEN);
        embed.setThumbnail((await BOT.CLIENT.application.fetch()).iconURL());
        let admins = await CONSTANTS.getAdmins();
        console.log(admins);
        let description = admins.map(teamMember => "- " + teamMember.user.tag).reverse().join("\n");

        embed.setDescription(description);

        message.reply({embeds: [embed]});    
    }
}

module.exports = Creators;