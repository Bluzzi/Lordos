const YT_SEARCH = require("util").promisify(require("yt-search"));

class YouTube {

    /**
     * Return a video info
     * @param {string} search 
     * @returns {Object}
     */
    static async searchVideo(search){
        try {
            let response = await YT_SEARCH(search);

            for(let key in response.videos){
                let currentInfo = response.videos[key];

                if(currentInfo.type === "video") return currentInfo;
            } 
        } catch {
            throw new Error("no video found");
        }

        throw new Error("error");
    }
}

module.exports = YouTube;