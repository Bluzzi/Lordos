const COMMAND = require("../../Command");
const INFORMATION = require("../../../objects/Information");
const DISCORD = require("discord.js");

class Info extends COMMAND {

    constructor(){
        super("info", "Affiche les informations d'un membre de ce serveur", "information");

        this.setUsage("<mention>");
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
                " à " + date.getHours() + "h" + date.getMinutes()
            );
        }

        // Roles of the member :
        information.addInformation(
            "Rôles",
            member.roles.cache.map(role => role.name).slice(0, -1).join(", ")
        );

        // Send information :
        information.send(message.channel);
    }
}

module.exports = Info;