const COMMAND = require("../Command");
const INFORMATION = require("../../objects/Information");

class Info extends COMMAND {

    constructor(){
        super(
            "info",
            "<mention>",
            "Affiche les informations d'une personne",
            [],
            "userinfo"
        );
    }

    async execute(args, message){
        // Define days and months translations :
        let daysList = [
            "Lundi", "Mardi", "Mercredi", "Jeudi", 
            "Vendredi", "Samedi", "Dimanche"
        ];

        let monthsList = [
            "janvier", "fevrier", "mars", 
            "avril", "mais", "juin", 
            "juillet", "aout", "septembre", 
            "octobre", "novembre", "decembre"
        ];

        // Consider whether the person wishes to obtain his or her own information or that of another person :
        let member;

        if(args[0] && message.mentions.users.first()){
            member = message.guild.member(message.mentions.users.first());
        } else {
            member = message.member;
        }
        
        // Create information instance :
        let information = new INFORMATION("Voici les informations de " + member.user.tag);

        // ID of the member :
        information.addInformation(
            "ID",
            member.id
        )
        
        // Creation date and joined guild date :
        let dateInfo = {
            "Compte crée le": new Date(member.user.createdAt),
            "Rejoint le": new Date(member.joinedAt)
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

        // Roles of the member :
        information.addInformation(
            "Roles",
            member.roles.cache.map(role => role.name).slice(0, -1).join(", ")
        );

        // Send information :
        information.send(message.channel);
    }
}

module.exports = Info;