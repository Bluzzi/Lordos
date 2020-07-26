CLIENT.on("error", (error) => {
    CLIENT.LOGGER.warn(error); //prints all discord API errors
})