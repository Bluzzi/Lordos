const LOGGER = new(require('./utils/Logger'))();
const COMMAND_MANAGER = new(require('./commands/CommandManager'))();

// Packages :
const CONSTANTS = require("./utils/Constants");
const { Client, Intents } = require("discord.js");
const CLI = require("../CLI/Main");

// REMOVE DEFAULT WARNINGS IN CONSOLE:
process.removeAllListeners("warning");

// Create discord BOT.CLIENT and save it and others things in a global :
BOT = {};

const CLIENT = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING]});

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