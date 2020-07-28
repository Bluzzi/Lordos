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
            })
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
          
        if(state.files.length < 1){
            return false;
        } else {
            return JSON.stringify(state.files);
        }
    }

    static async push(commitMessage){
        await GIT.add(".").catch(error => CLIENT.LOGGER.warn(error));
        CLIENT.LOGGER.cli("Added files!");
        await GIT.commit(commitMessage).then(commit => {
            CLIENT.LOGGER.cli("Commited changes! " + commit.summary.changes)
        }).catch(error => CLIENT.LOGGER.warn(error));
    }
}

module.exports = Git;