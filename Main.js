const LOGGER = new(require('./log/Logger'))();
const COMMANDMANAGER = new(require('./src/commands/CommandManager'))();

// Packages :
const CONSTANTS = require("./src/utils/Constants");
const DISCORD = require("discord.js");
const CLI = require("./cli/Main.js");

// Create discord client and save it and others things in a global :
CLIENT = new DISCORD.Client({disableMentions: "true"});
CLIENT.CONSTANTS = CONSTANTS;
CLIENT.LOGGER = LOGGER;
CLIENT.COMMANDMANAGER = COMMANDMANAGER;


// Start CLI:
CLIENT.CLI = CLI.start();
CLIENT.LOGGER.notice("Started Command Line Interface");

global.CLIENT = CLIENT;

// Startup logs:
CLIENT.LOGGER.notice("Actual version: " + require("./package.json").version);
CLIENT.LOGGER.notice("External packages list: " + Object.keys(require("./package.json").dependencies).join(", "));

// Events loader :
CLIENT.LOGGER.notice(CLIENT.COMMANDMANAGER.loadEvents() + " events loaded !");

// Bot commands loader :
CLIENT.LOGGER.notice(CLIENT.COMMANDMANAGER.loadCommands(false) + " bot commands loaded !");

// Cli commands loader :
CLIENT.LOGGER.notice(CLIENT.COMMANDMANAGER.loadCommands(true) + " CLI commands loaded !");

// Connect the client :
CLIENT.login(CONSTANTS.token);

