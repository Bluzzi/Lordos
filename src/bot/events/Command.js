const EMBED = require("../utils/Embed");
const COLOR = require("../utils/ColorConstants");
const CONSTANTS = require("../utils/Constants");

BOT.CLIENT.on("messageCreate", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type !== "GUILD_TEXT") return;
    if(!message.content.startsWith(BOT.CONSTANTS.prefix)) return;

    let args = message.content.substring(1).split(" ");
    let commandName = args.shift().toLowerCase();
    let command = BOT.COMMAND_MANAGER.get(commandName);
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
            if(!message.guild.me.permissions.has(command.getPermissions())){
                return EMBED.send("Je n'ai pas la permission d'utiliser cette commande !\nPermission(s) requise(s) : `" + command.getPermissions().join("`, `") + "`", message.channel, 'RED');
            }
        }

        let execute = await command.execute(args, message);

        if(execute == false) EMBED.reply(command.getUsageDescription(), message, COLOR.RED);

        BOT.LOGGER.info(`${message.author.tag} executed command: ${commandName.toLowerCase()}`);
    }
});