const { default: simpleGit } = require("simple-git");
const GIT = simpleGit();

class Git {
    /**
     * @returns {Array<String>}
     */

    static getRemotes(){
        return new Promise((resolve, reject) => {
            GIT.getRemotes()
            .then(remotes => {
                resolve(remotes.map(r => r.name));
            })
            .catch(error => {
                resolve([]);
                CLIENT.LOGGER.warn(error);
            });
        });
    }

    /**
     * 
     * @param {String} remoteName 
     * @param {String} branchName
     * @returns {String|false}
     */

    static async pull(remoteName, branchName){
        let state = await GIT.pull(remoteName, branchName).catch(error => CLIENT.LOGGER.warn(error));    
          
        if(state != undefined){
            if(state.files.length < 1){
                CLIENT.LOGGER.cli("Already up to date");
            } else {
                CLIENT.LOGGER.cli("Pulled! Updated files: " + "\n-"+state.files.join("\n-"));
            }
        }
    }

    /**
     * 
     * @param {String} commitMessage 
     * @param {String} remoteName 
     * @param {String} branchName 
     */

    static async push(commitMessage, remoteName, branchName){
        await GIT.add(".").catch(error => CLIENT.LOGGER.warn(error));
        CLIENT.LOGGER.cli("Added files!");
        await GIT.commit(commitMessage).then(async (commit) => {
            CLIENT.LOGGER.cli("Commited changes ! (ID: " + commit.commit + ")");
            await GIT.push(remoteName, branchName).then(push => {
                if(push.pushed){
                    CLIENT.LOGGER.cli("Pushed changes!" + push.remoteMessages.all.join("\n"));
                } else { 
                    CLIENT.LOGGER.cli("Error during pushing!" + push.remoteMessages.all.join("\n"));
                }
            }).catch(error => CLIENT.LOGGER.warn(error));
        }).catch(error => CLIENT.LOGGER.warn(error));
    }
}

module.exports = Git;