const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const FS = require("fs");
const COLOR = require("../../../utils/Color");

const CONTROLER = ["◀️", "▶️", "🚫"];

class Help extends COMMAND {

    constructor(){
        super("help", "Obtenir la liste des commandes du bot", "information");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        message.channel.send(this.getHelpEmbed(args[0])).then(msg => this.helpUpdater(msg, args[0]));
    }

    helpUpdater(message, category = null){
        // Add controler reactions :
        CONTROLER.forEach(emoji => message.react(emoji));

        // Create collector for updates :
        let collector = message.createReactionCollector(
            (reaction, user) => CONTROLER.includes(reaction.emoji.name) && user.id != MAIN.CLIENT.user.id, 
            {time: 1000 * 60 * 5}
        );

        collector.on("collect", (reaction, user) => {
            collector.stop();

            // Emoji for close the help :
            if(reaction.emoji.name === "🚫"){
                message.delete();
                return;
            }

            // Remove the reaction :
            message.reactions.resolve(reaction.emoji.name).users.remove(user);

            // Get the new page :
            let categories = MAIN.COMMAND_MANAGER.getCategoryList();
            let newCategory = category ? categories.indexOf(category) : null;

            if(newCategory !== null){
                newCategory = reaction.emoji.name === "◀️" ? categories[newCategory - 1] : categories[newCategory + 1];
            } else {
                newCategory = reaction.emoji.name === "◀️" ? categories[categories.length - 1] : categories[0];
            }

            // Update the message :
            message.edit(this.getHelpEmbed(newCategory)).then(msg => this.helpUpdater(msg, newCategory));
        });

        collector.on("end", (collection, reason) => {
            if(reason === "time") message.delete();
        });
    }

    getHelpEmbed(category = null){
        let prefix = MAIN.CONSTANTS.prefix;

        // Create base of embed :
        let embed = new DISCORD.MessageEmbed();

        embed.setColor(COLOR.GREEN);
        
        // Add content of the first page :
        if(!category || !MAIN.COMMAND_MANAGER.getCategoryList().includes(category)){
            embed.setTitle("Fonctionnement et liste des catégorie de commande");

            embed.setDescription(
                "Pour utiliser une commande, vous devez écrire ``" + prefix + "`` suivi du nom de la commande.\n\n"
                + "Pour voir les commandes disponibles, faites ``" + prefix + "help <nom de la catégorie de commande>`` "
                + "ou utilisez les réactions ci-dessous.\n\n"
                + "Voici la liste des catégories de commande : ``" + MAIN.COMMAND_MANAGER.getCategoryList().join("``, ``") + "``."
            );
        } else {
            embed.setTitle("Catégorie " + (category.charAt(0).toUpperCase() + category.slice(1)));

            MAIN.COMMAND_MANAGER.getCategory(category).forEach(command => {
                embed.addField(
                    "``" + prefix + command.getName() + (command.getUsage() ? " " + command.getUsage() : "") + "``",
                    command.getDescription()
                );
            });

            /*let iconPath = __dirname + "/../../../../resources/images/command_category/" + category + ".png";

            if(FS.existsSync(iconPath)){ //TODO: fix that
                embed.setThumbnail("attachment://" + category + ".png");
                embed.attachFiles(new DISCORD.MessageAttachment(iconPath, category + ".png"));
            }*/
        }

        // Add the footer with current page :
        let categories = MAIN.COMMAND_MANAGER.getCategoryList();

        categories.splice(0, 0, "page d'aide");

        categories = categories.join(" - ");

        let replace = category !== null ? category : "page d'aide";
        
        categories = categories.replace(replace, replace.toUpperCase());

        embed.setFooter(categories);

        // Return the embed :
        return embed;
    }
}

module.exports = Help;