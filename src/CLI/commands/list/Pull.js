const CLICOMMAND = require("../CliCommand");
const GIT = require("../../utils/Git");
const STYLE = require("../../utils/Style");

class Pull extends CLICOMMAND {

    constructor(){
        super("pull", "Update the project");

        this.setUsage("<remote name, default: \"lordos\"> <branch name, default: \"master\">");
    }

    /**
     * @param {string[]} args 
     */
    async execute(args){
        let remote = args[0] || "lordos";
        let branch = args[1] || "master";

        let remoteList = await GIT.getRemotes();

        if(remoteList.includes(remote)){
            BOT.LOGGER.cli(STYLE.createTitle("PULL"));
            
            await GIT.pull(remote, branch);
        } else {
            BOT.LOGGER.cli("Remote '" + remote + "' does not exist ! Remote list: " + remoteList);
        }
    }
}

module.exports = Pull;