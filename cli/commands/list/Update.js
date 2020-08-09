const CLICOMMAND = require("../CliCommand");
const GIT = require("../../utils/Git");
const STYLE = require("../../utils/Style");

class Update extends CLICOMMAND {

    constructor(){
        super("update", "Allow you to update the project (pull & push)");

        this.setUsage("<remote name> <branch name> <commit message>");
    }

    /**
     * @param {string[]} args 
     */
    async execute(args){
        if(args.length < 3) return false;

        let remote = args[0];
        let branch = args[1];

        let commitMessage = args.slice(2, args.length).join(" ");
        let remoteList = await GIT.getRemotes();

        if(remoteList.includes(remote)){
            //PULL :
            MAIN.LOGGER.cli(STYLE.createTitle("PULL"));
            
            await GIT.pull(remote, branch);

            //PUSH :
            MAIN.LOGGER.cli(STYLE.createTitle("PUSH"));

            await GIT.push(commitMessage, remote, branch);
        } else {
            MAIN.LOGGER.cli("This remote does not exist, there is the remote list in this project: " + remoteList);
        }
    }
}

module.exports = Update;