const CLICOMMAND = require("../CliCommand");
const FS = require("fs");

const BASE_PATH = "./resources/configs/CommandTemplate.txt";

class CreateCommand extends CLICOMMAND {

    constructor(){
        super("createcommand", "Create a command");

        this.setUsage("<name> <category>");
    }

    /**
     * @param {string[]} args 
     */
    async execute(args){
        if(args.length < 2) return false;

        var name = args[0];

        var category = args[1].toLowerCase();
        var categoryPath = "./src/commands/list/" + category + "/";

        //CHECK IF CATEGORY EXISTS :
        if(FS.existsSync(categoryPath)){
            await this.#create(name, category);
        } else {
            MAIN.LOGGER.cli("Category '" + category + "' does not exist !");
            let answer = await this.#ask("Do you want to create a new category named '" + category + "' ? (NO/yes)");

            //CREATE A NEW CATEGORY :
            if (["y", "o", "oui", "yes"].includes(answer.toLowerCase())) { 
                FS.mkdir(categoryPath, async (err) => {
                    if(err) return MAIN.LOGGER.warn(err);

                    MAIN.CLIENT.CLI.resume();
                    MAIN.LOGGER.cli("Sucessfully created category '" + category + "'");
                    await this.#create(name, category);
                });
            } else {
                //CANCEL :
                MAIN.CLIENT.CLI.resume();
                MAIN.LOGGER.cli("Aborted!");
            }
        }
    }


    //CREATE A COMMAND :
    #create = async (name, category) => {
        let path = "./src/commands/list/" + category + "/" + name + ".js";

        //CHECK IF THE COMMAND FILE ALREADY EXISTS:
        if(!FS.existsSync(BASE_PATH)) return MAIN.LOGGER.cli("Unable to open " + BASE_PATH);
        if(FS.existsSync(path)) return MAIN.LOGGER.cli("This command already exists !");
        
        //CREATE THE COMMAND:
        FS.copyFile(BASE_PATH, "./src/commands/list/" + category + "/" + name + ".js", () => {
            FS.readFile(path, 'utf8', async (err, data) => {
                if(err) return MAIN.LOGGER.warn(err);

                //NAME AND CATEGORY:
                data = data.replace(/{fileName}/g, name);
                data = data.replace(/{name}/g, name.toLowerCase());
                data = data.replace(/{category}/g, category);

                //ASK FOR DESCRIPTION:
                data = data.replace(/{desc}/g, await this.#ask("Enter the command description (leave it empty if not): "));

                //ASK FOR ALIASES:
                let aliases = await this.#ask("Enter the command aliases (leave it empty if not) (format: alias1 alias2): ");
                data = data.replace(/{aliases}/g, aliases.length > 0 ? '"' + aliases.split(" ").join('", "') + '"' : "");

                //ASK FOR PERMISSIONS:
                let permissions = await this.#ask("Enter the command permissions (leave it empty if not) (format: PERM_1 PERM_2): ");
                data = data.replace(/{permissions}/g, permissions.length > 0 ? '"' + permissions.split(" ").join('", "') + '"' : "");
                
                //ASK FOR USAGE:
                data = data.replace(/{usage}/g, await this.#ask("Enter the command usage (leave it empty if not): "));

                //CREATE THE COMMAND FILE:
                FS.writeFile(path, data, (err) => {
                    if(err) return MAIN.LOGGER.warn(err);
    
                    MAIN.LOGGER.cli("Created command '" + name + "'");
                });
            });
        });
    }

    //ASK PRIVATE METHOD:
    #ask = (question) => {
        return new Promise((resolve, reject) => {
            MAIN.LOGGER.cli(question);
            MAIN.CLIENT.CLI.question("", (answer) => {
                resolve(answer);
            });
        });
    }
}

module.exports = CreateCommand;