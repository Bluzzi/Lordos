const LOGGER = new(require('./log/Logger'))();
const COMMANDMANAGER = new(require('./src/commands/CommandManager'))();

// Packages :
const FS = require("fs");
const COMMAND = require("./src/commands/Command");
const CONSTANTS = require("./src/utils/Constants");
const DISCORD = require("discord.js");
const CLI = require("./cli/Main.js");
const CLICOMMAND = require('./cli/commands/CliCommand');
const CliCommand = require('./cli/commands/CliCommand');

// Create discord client and save it and others things in a global :
CLIENT = new DISCORD.Client({disableMentions: "true"});

CLIENT.CONSTANTS = CONSTANTS;
CLIENT.LOGGER = LOGGER;
CLIENT.COMMANDMANAGER = COMMANDMANAGER;
CLIENT.CLI = CLI.start(); //CLI

global.CLIENT = CLIENT;



// Startup log:
CLIENT.LOGGER.notice("Initializing...");
CLIENT.LOGGER.notice("Actual version: " + require("./package.json").version);
CLIENT.LOGGER.notice("External packages list: " + Object.keys(require("./package.json").dependencies).join(", "));

// Auto load all events :
FS.readdirSync("./src/events/").forEach(eventName => {
    require("./src/events/" + eventName);
    CLIENT.LOGGER.notice("Loaded event: " + eventName);
});

// Bot command loader :
let count = 0;

FS.readdirSync("./src/commands/list").forEach(commandName => {
    if(commandName.split(".").pop() == "js"){
        let commandClass = new(require("./src/commands/list/"+commandName))();

        if(commandClass instanceof COMMAND){
            CLIENT.LOGGER.notice("Loaded bot command: " + commandName);
            CLIENT.COMMANDMANAGER.add(commandClass);

            count++;
        } else {
            CLIENT.LOGGER.warn("Cannot load: (not a Command instance) " + commandName);
        }
    }
});

CLIENT.LOGGER.notice(count + " bot commands loaded !");
count = 0;

// Cli command loader : 
FS.readdirSync("./cli/commands/list").forEach(cliCommandName => {
    if(cliCommandName.split(".").pop() == "js"){
        let cliCommandClass = new(require("./cli/commands/list/"+cliCommandName))();
        if(cliCommandClass instanceof CLICOMMAND){
            CLIENT.LOGGER.notice("Loaded CLI command: " + cliCommandName);
            CLIENT.COMMANDMANAGER.add(cliCommandClass, true);
            count++;
        } else {
            CLIENT.LOGGER.warn("Cannot load: (not a CliCommand instance) " + cliCommandName);
        }
    }
});

CLIENT.LOGGER.notice(count + " CLI commands loaded !");

// Connect the client :
CLIENT.login(CONSTANTS.token);