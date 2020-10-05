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
        embed.setThumbnail((await MAIN.CLIENT.fetchApplication()).iconURL());

        let admins = await CONSTANTS.getAdmins();

        let description = admins.map(teamMember => "- " + teamMember.user.tag).reverse().join("\n");

        embed.setDescription(description);

        message.channel.send(embed);    
    }
}

module.exports = Creators;