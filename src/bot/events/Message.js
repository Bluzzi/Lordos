const EMBED = require("../utils/Embed");

BOT.CLIENT.on("message", message => {
    if(message.channel.type !== "text") return;

    if(message.author.bot == false) BOT.LOGGER.info(message.author.username + " : " + message.content);
    if(message.channel.type == "dm") return;
    if(!message.mentions.users.get(message.guild.me.id)) return;
    
    EMBED.send(
        "Salut <@!" + message.author + ">, fais ``"+ BOT.CONSTANTS.prefix + "help`` pour voir la liste de mes commandes.", 
        message.channel
    );
});