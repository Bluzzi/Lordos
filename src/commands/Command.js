class Command {

    /**
     * @param {String} name 
     * @param {String} usage 
     * @param {String} alias 
     * @param {Array} permissions 
     */

    constructor(name, usage = "", alias = "", permissions = []) {
        this.name = name;
        this.usage = usage;
        this.alias = alias;
        this.permissions = permissions;
    }

    /**
     * @returns {String}
     */

    getName(){
        return this.name;
    }

    /**
     * @returns {String}
     */

    getUsage(){
        return `Utilisation : ${CLIENT.CONSTANTS.prefix}${this.getName()} ${this.usage}`;
    }

    /**
     * @returns {String}
     */

    getAlias(){
        return this.alias;
    }


    /**
     * @returns {Array}
     */

    getPermissions(){
        return this.permissions;
    }
}

module.exports = Command;