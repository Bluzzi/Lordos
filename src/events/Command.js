const EMBED = require("../utils/Embed");
const COLOR = require("../utils/Color");
const DISCORD = require("discord.js");
const CONSTANTS = require("../utils/Constants");

/**
 * @param {DISCORD.Message} message
 */
MAIN.CLIENT.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    if(!message.content.startsWith(MAIN.CONSTANTS.prefix)) return;

    let args = message.content.substring(1).split(" ");
    let commandName = args.shift().toLowerCase();
    let command = MAIN.COMMAND_MANAGER.get(commandName);
    let admins = await CONSTANTS.getAdmins();

    if(command){
        if(command.getPermissions().includes("BOT.ADMINISTRATOR")){
            if(!admins.map(teamMember => teamMember.user.id).includes(message.author.id)){
                return EMBED.send("Vous n'avez pas accès à cette commande !\nPermission(s) requise(s) : `" + command.getPermissions().join("`, `") + "`", message.channel, 'RED');
            }
        } else{
            if(!message.member.permissions.has(command.getPermissions())){
                return EMBED.send("Vous n'avez pas accès à cette commande !\nPermission(s) requise(s) : `" + command.getPermissions().join("`, `") + "`", message.channel, 'RED');
            }
            if(!message.guild.me.hasPermission(command.getPermissions())){
                return EMBED.send("Je n'ai pas la permission d'utiliser cette commande !\nPermission(s) requise(s) : `" + command.getPermissions().join("`, `") + "`", message.channel, 'RED');
            }
        }

        let execute = await command.execute(args, message);

        if(execute == false) EMBED.send(command.getUsageDescription(), message.channel, COLOR.RED);

        MAIN.LOGGER.info(`${message.author.tag} executed command: ${commandName.toLowerCase()}`);
    }
});