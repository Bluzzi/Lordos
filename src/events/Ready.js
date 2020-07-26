CLIENT.on("ready", () => {
    CLIENT.user.setActivity('Lordos');
    CLIENT.LOGGER.notice("Client connected as " + CLIENT.user.tag);
})