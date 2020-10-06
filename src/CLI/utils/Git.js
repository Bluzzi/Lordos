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
                BOT.LOGGER.warn(error);
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
        let state = await GIT.pull(remoteName, branchName).catch(error => BOT.LOGGER.warn(error));    
          
        if(state != undefined){
            if(state.files.length < 1){
                BOT.LOGGER.cli("Already up to date");
            } else {
                BOT.LOGGER.cli("Pulled! Updated files: " + "\n-"+state.files.join("\n-"));
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
        await GIT.add(".").catch(error => BOT.LOGGER.warn(error));
        BOT.LOGGER.cli("Added files!");
        await GIT.commit(commitMessage).then(async (commit) => {
            if(commit.commit.length > 0){
                BOT.LOGGER.cli("Commited changes ! (ID: " + commit.commit + ")");
                await GIT.push(remoteName, branchName).then(push => {
                    if(push.pushed){
                        BOT.LOGGER.cli("Pushed changes! Ref: " + push.ref.local);
                    } else { 
                        BOT.LOGGER.cli("Error during pushing!");
                    }
                }).catch(error => BOT.LOGGER.warn(error));
            } else {
                BOT.LOGGER.cli("Nothing to push!");
            }
        }).catch(error => BOT.LOGGER.warn(error));
    }
}

module.exports = Git;