MAIN.CLIENT.on("message", (message) => {
    if(message.author.bot == false) MAIN.LOGGER.info(message.author.username + " : " + message.content);
});