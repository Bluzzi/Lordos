const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const COLOR = require("../../../utils/ColorConstants");
const DISCORD = require("discord.js");
const MAIN = require("../../../../Main")
const MYSQL = require("mysql2");

class URL extends COMMAND {

    constructor(){
        super("url", "Voir les liens favoris du serveur", "utils");

        this.setUsage("[nom de l'url]");
        this.setAliases(["favorites", "fav", "urls"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){/*
        let results = await MAIN.mysql.query("SELECT urls FROM urls WHERE guild=" + message.guild.id);

        if(results.length === 0){
            EMBED.send("Ce serveur n'a aucun favoris, vous pouvez les configurés via le panel Admin.", message.channel, {color: COLOR.RED});
        } else {
            let embed = new DISCORD.MessageEmbed();

            embed.setTitle("Favoris du serveur");
            embed.setColor(COLOR.GREEN);

            for(let [name, link] of Object.entries(JSON.parse(results[0].urls))){
                embed.addField(name, link);
            }

            message.channel.send({embeds: [embed]});
        }*/
    }
}

module.exports = URL;