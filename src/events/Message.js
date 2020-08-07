const EMBED = require("../utils/Embed");

MAIN.CLIENT.on("message", (message) => {
    if(message.author.bot == false) MAIN.LOGGER.info(message.author.username + " : " + message.content);
    if(!message.mentions.users.get(message.guild.me.id))return;
    
    let text = "Salut <@!" + message.author + ">, fais ``"+ MAIN.CONSTANTS.prefix + "help`` pour voir la liste de mes commadndes."
    EMBED.send(text, message.channel);
});