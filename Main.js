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
CLIENT.login("NzMzODE5MzQ1OTA1NTE2NjU2.XxIsyg.Kr-Ab2hsYpfPmb_ubwunR9fDrs0");