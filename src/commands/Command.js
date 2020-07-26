class Command {

    /**
     * @param {String} name 
     * @param {String} usage 
     * @param {String} alias 
     * @param {Array} permissions 
     * @param {String} description
     */

    constructor(name, usage = "", alias = "", permissions = [], description = "") {
        this.name = name;
        this.usage = usage;
        this.alias = alias;
        this.permissions = permissions;
        this.description = description;
    }

    execute() {
        throw new Error('execute must be defined');
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

    /**
     * @returns {String}
     */

    getDescription(){
        return this.description;
    }
}

module.exports = Command;