const CONSTANTS = require("./src/utils/Constants");

// Create discord client :
const DISCORD = require("discord.js");
global.CLIENT = new DISCORD.Client({disableMentions: "true"});

// Packadges :
const FS = require("fs");

// Auto load all events :
FS.readdirSync("./src/events/").forEach(eventName => {
    require("./src/events/" + eventName);
});

// Connect the client :
CLIENT.login(CONSTANTS.token);