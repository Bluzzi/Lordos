const FS = require("fs");

class Config {

    static writeJson(path, data){
        FS.writeFileSync(path, JSON.stringify(data, null, 4, error => { if(error){ console.log(error) }}));
    }

    static getJson(path){
        if(!FS.existsSync(path)) this.write(path, {});

        return JSON.parse(FS.readFileSync(path, "utf8"));
    }
}

module.exports = Config;