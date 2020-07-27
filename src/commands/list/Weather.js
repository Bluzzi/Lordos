const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const WEATHER = require('weather-js');

class Weather extends COMMAND {
    constructor(){
        super("weather", "<lieu>", "Donne la météo d'une position", [], "meteo");
    }

    execute(args, message) {
        if(!args[0]) {
            return false;
        } else {
            let position = args.join(" ");
        
            WEATHER.find({search: position, degreeType: 'C'}, (err, result) => {
                if(err) {
                    EMBED.send("Oups, il semblerait qu'il n'y a pas de données pour cette position !", message.channel, 'RED');
                } else {
                    result = result[0];
                    if(result == undefined) {
                        EMBED.send("Oups, il semblerait qu'il n'y a pas de données pour cette position !", message.channel, 'RED');
                    } else {
                        EMBED.send(`**Données météo pour __${result.location.name + " (" + parseFloat(result.location.lat).toFixed(2) + ", " + parseFloat(result.location.long).toFixed(2) + ")"}__**\n\n**Température** : ${result.current.temperature}°C (ressenti: ${result.current.feelslike}°C)\n**Ciel** : ${result.current.skytext}\n**Humidité** : ${result.current.humidity}%\n**Vent** : ${result.current.windspeed}\n\n**Observation à** : ${result.current.observationtime + " (UTC"+result.location.timezone+")"}`, message.channel, 'GREEN');
                    }
                }
            });
        }
    }
}

module.exports = Weather;