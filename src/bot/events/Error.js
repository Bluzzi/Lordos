MAIN.CLIENT.on("error", (error) => {
    MAIN.LOGGER.warn(error); //prints all discord API errors
});