const YT_SEARCH = require("yt-search");

class YouTube {

    /**
     * Return a video info
     * @param {string} search 
     * @returns {Object}
     */
    static searchVideo(search){
        return new Promise((resolve, reject) => {
            YT_SEARCH(search, (err, response) => {
                if(err) reject(err);
    
                for(let key in response.videos){
                    let currentInfo = response.videos[key];
    
                    if(currentInfo.type === "video") resolve(currentInfo);
                }    
            });
        });
    }
}

module.exports = YouTube;