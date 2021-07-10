const COMMAND = require("../../Command");
const DISCORD = require("discord.js");/*
const STOCKXAPI = require("stockx-api");
const ColorConstants = require("../../../utils/ColorConstants");
const STOCKX = new STOCKXAPI();*/

class Stockx extends COMMAND {

    constructor(){
        super("stockx", "Donne des infos sur un produit disponible sur StockX","information");

        this.setAliases([]);
        this.setPermissions([]);
        this.setUsage("<search>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        /*if(!args[0]) return false;
        STOCKX.searchProducts(args.join(" "), {
            limit: 1
        }).then(response => {
            let embed = new DISCORD.MessageEmbed()
                .setColor(ColorConstants.GREEN)
                .setAuthor(response[0].name, null, "https://stockx.com/" + response[0].uuid)
                .addField("Prix retail :", response[0].retail + "€")
                .addField("Date de sortie :", response[0].releaseDate)
                .addField("Taille de la demande la plus élevée :", response[0].market.highestBidSize + "US (" + response[0].market.highestBid + "€)")
                .addField("Taille de l'offre la plus basse :", response[0].market.lowestAskSize + "US (" + response[0].market.lowestAsk + "€)")
                .addField("Dernière vente :", response[0].market.lastSaleSize + "US (" + response[0].market.lastSale + "€)")
                .setImage(response[0].image)
            message.channel.send(embed);
        }).catch(error => message.channel.send("Aucun résultat a été trouvé."));*/
    }
}

module.exports = Stockx;