class Command {

    /**
     * @param {String} name 
     * @param {String} usage 
     * @param {Array} aliases 
     * @param {Array} permissions 
     */

    constructor(name, usage = "", aliases = [], permissions = []) {
        this.name = name;
        this.usage = usage;
        this.aliases = aliases;
        this.permissions = permissions;
    }

    /**
     * @returns {String}
     */

    getName(){
        return this.name;
    }

    /**
     * @returns {Array}
     */

    getAliases(){
        return this.aliases;
    }

    /**
     * @returns {String}
     */

    getUsage(){
        return this.usage;
    }

    /**
     * @returns {Array}
     */

    getPermission(){
        return this.permissions;
    }
}

module.exports = Command;