process.on('warning', async (warning) => {
    MAIN.LOGGER.warn(warning.message);
});