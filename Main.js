const CONSTANTS = require("./src/utils/Constants");
const LOGGER = new(require('./src/utils/Logger'))();
const COMMANDMANAGER = new(require('./src/commands/CommandManager'))();

// Create discord client :
const DISCORD = require("discord.js");
CLIENT = new DISCORD.Client({disableMentions: "true"});
CLIENT.CONSTANTS = CONSTANTS;
CLIENT.LOGGER = LOGGER;
CLIENT.COMMANDMANAGER = COMMANDMANAGER;
global.CLIENT = CLIENT;

// Packadges :
const FS = require("fs");
const COMMAND = require("./src/commands/Command");

// Auto load all events :
FS.readdirSync("./src/events/").forEach(eventName => {
    require("./src/events/" + eventName);
});

//Command loader:
FS.readdirSync("./src/commands/list").forEach(commandName => {
    let commandClass = new(require("./src/commands/list/"+commandName))();
    if (commandClass instanceof COMMAND) {
        CLIENT.LOGGER.notice("Loaded command: " + commandName);
        CLIENT.COMMANDMANAGER.add(commandClass);
    } else {
        CLIENT.LOGGER.warn("Cannot load: (not a Command instance) " + commandName);
    }
});

// Connect the client :
CLIENT.login(CONSTANTS.token);