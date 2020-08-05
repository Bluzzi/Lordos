const COMMAND = require("../../Command");
const INFORMATION = require("../../../objects/Information");
const EMBED = require("../../../utils/Embed");

class ServerInfo extends COMMAND {

    constructor(){
        super("serverinfo", "Obtenir des informations sur le serveur", "information");
    }

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

        // Creation date :
        let dateInfo = {
            "Serveur crée le": new Date(member.guild.createdAt)
        };

        for(let [info, date] of Object.entries(dateInfo)){
            information.addInformation(
                info, 
                daysList[date.getDay()] + " " + date.getDate() + " " + 
                monthsList[date.getMonth()] + " " + date.getFullYear() + 
                " à " + date.getHours() + " heure(s) " + date.getMinutes() + 
                " minute(s) et " + date.getSeconds() + " seconde(s)"
            );
        }

        //Number of members :
        information.addInformation("Membres", member.guild.memberCount + " membre(s)")

        // All server roles :
        information.addInformation("Roles", member.guild.roles.cache.map(role => role.name).slice(1).join(", "));

        EMBED.send(information.toString(), message.channel, {thumbnail: member.guild.iconURL()});
    }
}

module.exports = ServerInfo;