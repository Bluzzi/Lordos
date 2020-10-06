BOT.CLIENT.on("error", (error) => {
    BOT.LOGGER.warn(error); //prints all discord API errors
});