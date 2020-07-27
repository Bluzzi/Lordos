const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Help extends COMMAND {
    constructor() {
        super("help", "[commande]", "aide", [], "Donne des informations sur une commande ou la liste de celles-ci");
    }

    execute(args, message){
        if(!args[0]) { //send command list
            let commandList = CLIENT.COMMANDMANAGER.all().map(command => command.getName());
            EMBED.send(`**Liste des commandes :**\n\n\`${commandList.join("`, `")}\`\n\nPour obtenir plus d'informations sur une commande faites **${CLIENT.CONSTANTS.prefix}help [commande]**`, message.channel, 'GREEN');
        } else {
            let command = CLIENT.COMMANDMANAGER.get(args[0]);
            if (command) {
                EMBED.send(`**Informations sur la commande** \`${command.getName()}\` :\n\n**Alias** : \`${command.getAlias()}\`\n**Utilisation** : \`${command.getUsage()}\`\n**Description** : \`${command.getDescription() || "Pas de description"}\`\n**Permissions** : \`${command.getPermissions().join("`, `") || "Pas de permissions"}\``, message.channel, 'GREEN');
            } else {
                EMBED.send(`Cette commande est introuvable !`, message.channel, 'RED');
            }
        }
    }
}

module.exports = Help;