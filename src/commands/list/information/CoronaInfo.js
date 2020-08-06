const COMMAND = require("../../Command");
const AXIOS = require("axios");
const EMBED = require("../../../utils/Embed");
const INFORMATION = require("../../../objects/Information");
const DISCORD = require("discord.js");

class CoronaInfo extends COMMAND {
    
    constructor() {
        super("coronainfo", "Vous donne des informations concernant le coronavirus", "information");

        this.setUsage("<pays/ISO code>");
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

        if (!args[0]) return false;

        AXIOS.get("https://api.covid19api.com/total/country/" + escape(args.join(" "))).then(response => {

        let information = response.data[Object.entries(response.data).length - 1];

            console.log(response.data)
            let messageInformation = new INFORMATION("Voici les Informations sur le coronavirus")

            messageInformation.addInformation("Pays", information.Country);
            messageInformation.addInformation("Cas confirmé", this.formatNumber(information.Confirmed) + " personne(s)");
            messageInformation.addInformation("Morts", this.formatNumber(information.Deaths) + " personne(s)");
            messageInformation.addInformation("Rétablis", this.formatNumber(information.Recovered) + " personne(s)");
            messageInformation.addInformation("Actif", this.formatNumber(information.Active) + " personne(s)")

            let date = new Date(information.Date);

            EMBED.send(messageInformation.toString(), message.channel, {
                footer: "Informations datant du " + daysList[date.getDay()] + " " + date.getDate() + " " + monthsList[date.getMonth()] + " " + date.getFullYear()
            })
        
        }).catch(error => {
            EMBED.send("Le nom du pays est incorect", message.channel);
        })
    }

    formatNumber(number) {

        return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1 ')
    }
}

module.exports = CoronaInfo;