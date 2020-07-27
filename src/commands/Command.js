class Command {

    /**
     * @param {String} name command name
     * @param {String} usage command usage
     * @param {String} description description of the command
     * @param {Array<String>} permissions list of permissions
     * @param {String} alias alias of the command
     */

    constructor(name, usage = "", description = "", permissions = [], alias = "") {
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
     * @returns {String} name
     */

    getName(){
        return this.name;
    }

    /**
     * @returns {String} usage
     */

    getUsage(){
        return "Vous devez faire `" + CLIENT.CONSTANTS.prefix + this.getName() + " " + this.usage + "` !";
    }

    /**
     * @returns {String} alias
     */

    getAlias(){
        return this.alias;
    }


    /**
     * @returns {Array<String>} permissions
     */

    getPermissions(){
        return this.permissions;
    }

    /**
     * @returns {String} description
     */

    getDescription(){
        return this.description;
    }
}

module.exports = Command;