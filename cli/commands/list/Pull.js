const CLICOMMAND = require("../CliCommand");
const GIT = require("../../utils/Git");
const STYLE = require("../../utils/Style");

class Pull extends CLICOMMAND {
    constructor(){
        super("pull", "<remote name, default: 'lordos'> <branch name, default: 'master'>", "Update the project")
    }

    async execute(args){
        let remote = args[0] || "lordos";
        let branch = args[1] || "master";
        let remoteList = await GIT.getRemotes();

        if(remoteList.includes(remote)){
            CLIENT.LOGGER.cli(STYLE.createTitle("PULL"));
            await GIT.pull(remote, branch);
        } else {
            CLIENT.LOGGER.cli("Remote '" + remote + "' does not exist ! Remote list: " + remoteList);
        }
    }
}

module.exports = Pull;