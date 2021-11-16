const COMMAND = require("../../Command");
const INFORMATION = require("../../../objects/Information");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class ServerInfo extends COMMAND {

    constructor(){
        super("serverinfo", "Obtenir des informations sur le serveur", "information");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){

         // Define days and months translations :
         let daysList = [
            "Lundi", "Mardi", "Mercredi", "Jeudi", 
            "Vendredi", "Samedi", "Dimanche"
        ];

        let monthsList = [
            "janvier", "fevrier", "mars", 
            "avril", "mai", "juin", 
            "juillet", "août", "septembre", 
            "octobre", "novembre", "decembre"
        ];
        
        let member = message.member;
        
        let information = new INFORMATION("Voici les informations du serveur " + member.guild.name);

        // Owner of the server :
        information.addInformation("Propriétaire", `${member.guild.owner}`);

        // ID of the server :
        information.addInformation("ID du serveur", member.guild.id);

        // Region of guild :
        information.addInformation("Région", member.guild.region);

        // Creation date :
        let dateInfo = {
            "Serveur crée le": new Date(member.guild.createdAt)
        };

        for(let [info, date] of Object.entries(dateInfo)){
            information.addInformation(
                info, 
                daysList[date.getDay()] + " " + date.getDate() + " " + 
                monthsList[date.getMonth()] + " " + date.getFullYear() + 
                " à " + date.getHours() + "h" + date.getMinutes()
            );
        }

        //Number of members :
        information.addInformation("Membres", member.guild.memberCount + " membre(s)");

        //Number of Humans :
        information.addInformation("Humains", member.guild.members.cache.filter(member => !member.user.bot).size + " humain(s)");

        //Number of Bots : 
        information.addInformation("Bots", member.guild.members.cache.filter(member => member.user.bot).size + " bot(s)");

        //Number of Channels :
        information.addInformation("Channels", member.guild.channels.cache.size + " channel(s)")

        // All server roles :
        information.addInformation("Roles", member.guild.roles.cache.map(role => role.name).slice(1).join(", "));

        // All server emojis : 
        information.addInformation("Emojis", member.guild.emojis.cache.map(emoji => "<:" + emoji.name + ":" + emoji + ">").join(" "));

        EMBED.reply(information.toString(), message, {thumbnail: member.guild.iconURL()});
    }
}

module.exports = ServerInfo;