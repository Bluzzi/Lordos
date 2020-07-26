CLIENT.on("message", (message) => {
    CLIENT.LOGGER.info(message.author.username + " : " + message.content);
});