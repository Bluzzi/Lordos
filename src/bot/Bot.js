const LOGGER = new(require('./utils/Logger'))();
const COMMAND_MANAGER = new(require('./commands/CommandManager'))();

// Packages :
const CONSTANTS = require("./utils/Constants");
const DISCORD = require("discord.js");
const CLI = require("../CLI/Main");

// REMOVE DEFAULT WARNINGS IN CONSOLE:
process.removeAllListeners("warning");

// Create discord BOT.CLIENT and save it and others things in a global :
BOT = {};

const CLIENT = new DISCORD.Client({disableMentions: "true"});

BOT.CLIENT = CLIENT;
BOT.CONSTANTS = CONSTANTS;
BOT.LOGGER = LOGGER;
BOT.COMMAND_MANAGER = COMMAND_MANAGER;

global.BOT = BOT;

// Projects global variables :
PROJECT = {};

PROJECT.WORDS = [];

global.PROJECT = PROJECT;

// Start CLI:
BOT.CLIENT.CLI = CLI.start();
LOGGER.notice("Started Command Line Interface");

// Startup logs:
LOGGER.notice("Actual version: " + require("../../package.json").version);
LOGGER.notice("External packages list: " + Object.keys(require("../../package.json").dependencies).join(", ") + "\nExternal packages count: " + Object.keys(require("../../package.json").dependencies).length);

// Events loader :
LOGGER.notice(COMMAND_MANAGER.loadEvents() + " events loaded !");

// Bot commands loader :
LOGGER.notice(COMMAND_MANAGER.loadCommands(false) + " bot commands loaded !");

// Cli commands loader :
LOGGER.notice(COMMAND_MANAGER.loadCommands(true) + " CLI commands loaded !");

// Connect the BOT.CLIENT :
CLIENT.login(CONSTANTS.token);