const FS = require("fs");
const OS = require("os");

class Config {

    /**
     * Set JSON content in a configuration
     * @param {string} path
     * @param {Object} data
     */
    writeJson(path, data){
        FS.writeFileSync(path, JSON.stringify(data, null, 4, error => { 
            if(error) BOT.LOGGER.warn(error)
        }));  
    }

    /**
     * Get a JSON config content in object
     * @param {string} path 
     * @returns {Object}
     */
    getJson(path){
        if(!FS.existsSync(path)) this.writeJson(path, {});

        return JSON.parse(FS.readFileSync(path, "utf8"));
    }

    /**
     * @param {string} path 
     * @param {string} data 
     */
    writeText(path, data){
        FS.open(path, "a", 666, (error, id) => {
            if (!FS.existsSync(path)) FS.writeFileSync(path);
            if(error) BOT.LOGGER.warn(error);

            FS.write(id, data+OS.EOL, null, "utf8", (error) => {
                if(error) BOT.LOGGER.warn(error);

                FS.close(id, (error) => {
                    if(error) BOT.LOGGER.warn(error);
                });
            });
        });
    }
}

module.exports = new Config();