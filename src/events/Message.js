const EMBED = require("../utils/Embed");

MAIN.CLIENT.on("message", message => {
    if(message.channel.type !== "text") return;

    if(message.author.bot == false) MAIN.LOGGER.info(message.author.username + " : " + message.content);
    if(message.channel.type == "dm") return;
    if(!message.mentions.users.get(message.guild.me.id)) return;
    
    EMBED.send(
        "Salut <@!" + message.author + ">, fais ``"+ MAIN.CONSTANTS.prefix + "help`` pour voir la liste de mes commadndes.", 
        message.channel
    );
});