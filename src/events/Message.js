CLIENT.on("message", (message) => {
    if(message.author.bot == false) CLIENT.LOGGER.info(message.author.username + " : " + message.content);
});