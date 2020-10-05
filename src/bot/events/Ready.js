MAIN.CLIENT.on("ready", () => {
    MAIN.CLIENT.user.setActivity('Lordos');
    MAIN.LOGGER.notice("Client connected as " + MAIN.CLIENT.user.tag);
})