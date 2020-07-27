const FS = require("fs");
const OS = require("os");

class Config {

    static writeJson(path, data){
        FS.writeFileSync(path, JSON.stringify(data, null, 4, error => { if(error) CLIENT.LOGGER.warn(error)}));  
    }

    static getJson(path){
        if(!FS.existsSync(path)) this.writeJson(path, {});

        return JSON.parse(FS.readFileSync(path, "utf8"));
    }

    /**
     * 
     * @param {String} path 
     * @param {String} data 
     */

    static writeText(path, data){
        FS.open(path, 'a', 666, (error, id) => {
            if(error) CLIENT.LOGGER.warn(error);
            FS.write(id, data+OS.EOL, null, 'utf8', (error) => { //OS.EOL = jump line
                if(error) CLIENT.LOGGER.warn(error);
                FS.close(id, (error) => {
                    if(error) CLIENT.LOGGER.warn(error);
                });
            });
        });
    }
}

module.exports = Config;