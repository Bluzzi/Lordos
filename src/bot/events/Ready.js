BOT.CLIENT.on("ready", () => {
    BOT.CLIENT.user.setActivity('Lordos');
    BOT.LOGGER.notice("Client connected as " + BOT.CLIENT.user.tag);
})