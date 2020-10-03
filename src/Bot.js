const LOGGER = new(require('./utils/Logger'))();
const COMMAND_MANAGER = new(require('./commands/CommandManager'))();

// Packages :
const CONSTANTS = require("./utils/Constants");
const DISCORD = require("discord.js");
const CLI = require("../cli/Main.js");

// REMOVE DEFAULT WARNINGS IN CONSOLE:
process.removeAllListeners("warning");

// Create discord MAIN.CLIENT and save it and others things in a global :
MAIN = {};

const CLIENT = new DISCORD.Client({disableMentions: "true"});

MAIN.CLIENT = CLIENT;
MAIN.CONSTANTS = CONSTANTS;
MAIN.LOGGER = LOGGER;
MAIN.COMMAND_MANAGER = COMMAND_MANAGER;

global.MAIN = MAIN;

// Projects global variables :
PROJECT = {};

PROJECT.WORDS = [];

global.PROJECT = PROJECT;

// Start CLI:
MAIN.CLIENT.CLI = CLI.start();
LOGGER.notice("Started Command Line Interface");

// Startup logs:
LOGGER.notice("Actual version: " + require("../package.json").version);
LOGGER.notice("External packages list: " + Object.keys(require("../package.json").dependencies).join(", ") + "\nExternal packages count: " + Object.keys(require("../package.json").dependencies).length);

// Events loader :
LOGGER.notice(COMMAND_MANAGER.loadEvents() + " events loaded !");

// Bot commands loader :
LOGGER.notice(COMMAND_MANAGER.loadCommands(false) + " bot commands loaded !");

// Cli commands loader :
LOGGER.notice(COMMAND_MANAGER.loadCommands(true) + " CLI commands loaded !");

// Connect the MAIN.CLIENT :
CLIENT.login(CONSTANTS.token);