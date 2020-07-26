const CONSTANTS = require("./src/utils/Constants");
const LOGGER = new(require('./src/utils/Logger'))();

// Create discord client :
const DISCORD = require("discord.js");
CLIENT = new DISCORD.Client({disableMentions: "true"});
CLIENT.CONSTANTS = CONSTANTS;
CLIENT.LOGGER = LOGGER;
global.CLIENT = CLIENT;

// Packadges :
const FS = require("fs");

// Auto load all events :
FS.readdirSync("./src/events/").forEach(eventName => {
    require("./src/events/" + eventName);
});

// Connect the client :
CLIENT.login(CONSTANTS.token);