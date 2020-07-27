const SETTINGS = require("../../settings.json");

class Constants {

    /**
     * @returns {String} prefix
    */
    
    static get prefix(){
        return SETTINGS.prefix; //used to be >
    }

    /**
     * @returns {String} token
    */

    static get token(){
        return SETTINGS.token; //used to be NzMzODE5MzQ1OTA1NTE2NjU2.XxIsyg.Kr-Ab2hsYpfPmb_ubwunR9fDrs0
    }
}

module.exports = Constants;