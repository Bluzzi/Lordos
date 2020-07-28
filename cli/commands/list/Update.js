const CLICOMMAND = require("../CliCommand");
const GIT = require("../../utils/Git");

class Update extends CLICOMMAND {
    constructor(){
        super("update", "update <remote name, default: lordos> <branch name, default: master>", "Allow you to update the project");
    }

    async execute(args){
        let remote = args[0] || "lordos";
        let branch = args[1] || "master";
        let remoteList = await GIT.getRemotes();
        if(remoteList.includes(remote)){
            CLIENT.LOGGER.cli("Trying to get the lastest version of " + remote + "...");
            let pull = await GIT.pull(remote, branch);
            if(!pull){
                CLIENT.LOGGER.cli("Pull: Already up to date");
            } else {
                CLIENT.LOGGER.cli("Pulled! Updated files: " + pull);
            }

            CLIENT.LOGGER.cli("Trying to push local changes...");
            await GIT.push();
        } else {
            CLIENT.LOGGER.cli("This remote does not exist, there is the remote list in this project: " + remoteList);
        }
    }
}

module.exports = Update;