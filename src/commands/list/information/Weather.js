const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const WEATHER = require("weather-js");
const DISCORD = require("discord.js");

class Weather extends COMMAND {

    constructor(){
        super("weather", "Donne la météo d'une position", "information");

        this.setAliases(["meteo", "météo"]);
        this.setUsage("<lieu>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    execute(args, message) {
        if(!args[0]) {
            return false;
        } else {
            let dictionary = {Sunny: "Ensoleillée", Cloudy: "Nuageux", "Mostly Cloudy": "Très Nuageux", Clear: "Ciel dégagé", "Mostly Sunny": "Très ensoleillé", "Thunder": "Orageux", "Rain Showers": "Averses de pluies", "Rainny": "Pluvieux", "Rain": "Pluie"}
            let coords = ["coords", "coordonéees", "position", "co"].includes(args.join(" ").split("--")[1]); 
            let position = args.join(" ");
        
            WEATHER.find({search: position, degreeType: 'C'}, (err, result) => {
                if(err) {
                    EMBED.send("Oups, il semblerait qu'il n'y a pas de données pour cette position !", message.channel, 'RED');
                } else {
                    result = result[0];
                    if(result == undefined) {
                        EMBED.send("Oups, il semblerait qu'il n'y a pas de données pour cette position !", message.channel, 'RED');
                    } else {
                        let skytext = dictionary[result.current.skytext] || result.current.skytext;
                        EMBED.send(`**Données météo pour __${result.location.name} ${coords == true ? " (" + parseFloat(result.location.lat).toFixed(2) + ", " + parseFloat(result.location.long).toFixed(2) + ")" : ""}__**\n\n**Température** : ${result.current.temperature}°C (ressenti: ${result.current.feelslike}°C)\n**Ciel** : ${skytext}\n**Humidité** : ${result.current.humidity}%\n**Vent** : ${result.current.windspeed}\n\n**Observation à** : ${result.current.observationtime + " (UTC"+result.location.timezone+")"}`, message.channel, 'GREEN');
                    }
                }
            });
        }
    }
}

module.exports = Weather;