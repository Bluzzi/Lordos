const CLICOMMAND = require("../CliCommand");
const FS = require("fs");

const BASE_PATH = "./resources/configs/CommandTemplate.txt";

class CreateCommand extends CLICOMMAND {

    constructor(){
        super("createcommand", "Create a command");

        this.setUsage("<file name> <category>");
    }

    /**
     * @param {string[]} args 
     */
    async execute(args){
        if(args.length < 2) return false;

        var name = args[0];

        var category = args[1].toLowerCase();
        var categoryPath = "./src/bot/commands/list/" + category + "/";

        // Check if category exists :
        if(FS.existsSync(categoryPath)){
            await this.#create(name, category);
        } else {
            BOT.LOGGER.cli("Category \"" + category + "\" does not exist !");

            let answer = await this.#ask("Do you want to create a new category named \"" + category + "\" ? (yes | no)");

            // Create a new category :
            if(answer.toLowerCase() === "yes"){ 
                FS.mkdir(categoryPath, async (err) => {
                    if(err) return BOT.LOGGER.warn(err);

                    BOT.CLIENT.CLI.resume();

                    BOT.LOGGER.cli("Sucessfully created category \"" + category + "\" !");

                    await this.#create(name, category);
                });
            } else {
                // Cancel :
                BOT.CLIENT.CLI.resume();

                BOT.LOGGER.cli("Aborted !");
            }
        }
    }

    /**
     * Create a command
     * @param {string} name 
     * @param {string} category 
     */
    #create = async (name, category) => {
        let path = "./src/bot/commands/list/" + category + "/" + name + ".js";

        // Check if the command file already exists :
        if(!FS.existsSync(BASE_PATH)) return BOT.LOGGER.cli("Unable to open " + BASE_PATH);
        if(FS.existsSync(path)) return BOT.LOGGER.cli("This command already exists !");
        
        // Create the command :
        FS.copyFile(BASE_PATH, "./src/bot/commands/list/" + category + "/" + name + ".js", () => {
            FS.readFile(path, "utf8", async (err, data) => {
                if(err) return BOT.LOGGER.warn(err);

                // Name and category :
                data = data.replace(/{fileName}/g, name);
                data = data.replace(/{name}/g, name.toLowerCase());
                data = data.replace(/{category}/g, category);

                // Ask for description :
                data = data.replace(/{desc}/g, await this.#ask("Enter the command description (leave it empty if not) :"));

                // Ask for aliases :
                let aliases = await this.#ask("Enter the command aliases (leave it empty if not) (format: alias1 alias2) :");

                data = data.replace(/{aliases}/g, aliases.length > 0 ? '"' + aliases.split(" ").join('", "') + '"' : "");

                // Ask for permission :
                let permissions = await this.#ask("Enter the command permissions (leave it empty if not) (format: PERM_1 PERM_2): ");

                data = data.replace(/{permissions}/g, permissions.length > 0 ? '"' + permissions.split(" ").join('", "') + '"' : "");
                
                // ASK FOR USAGE :
                data = data.replace(/{usage}/g, await this.#ask("Enter the command usage (leave it empty if not): "));

                // Create the command file :
                FS.writeFile(path, data, err => {
                    if(err) return BOT.LOGGER.warn(err);
    
                    BOT.LOGGER.cli("Created command \"" + name + "\" !");
                });
            });
        });
    }

    /**
     * Ask private method
     * @param {string} question 
     */
    #ask = (question) => {
        return new Promise(resolve => {
            BOT.LOGGER.cli(question);

            BOT.CLIENT.CLI.question("", answer => resolve(answer));
        });
    }
}

module.exports = CreateCommand;