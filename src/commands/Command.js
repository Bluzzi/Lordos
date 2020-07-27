class Command {

    /**
     * @param {String} name command name
     * @param {String} usage command usage
     * @param {String} alias alias of the command
     * @param {Array} permissions list of permissions
     * @param {String} description description of the command
     */

    constructor(name, usage = "", alias = "", permissions = [], description = "") {
        this.name = name;
        this.usage = usage;
        this.alias = alias;
        this.permissions = permissions;
        this.description = description;
    }

    execute(){
        throw new Error("execute must be defined");
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
        return "Vous devez faire ``" + CLIENT.CONSTANTS.prefix + this.getName() + " " + this.usage + "`` !";
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