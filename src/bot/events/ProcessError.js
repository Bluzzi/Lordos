process.on('warning', async (warning) => {
    BOT.LOGGER.warn(warning.message);
});