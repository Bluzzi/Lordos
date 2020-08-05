class Command {

    #name;
    #description;
    #category;
    #usage = "";
    #aliases = [];
    #permissions = [];

    /**
     * @param {String} name command name
     * @param {String} description description of the command
     * @param {String} category
     */

    constructor(name, description, category) {
        this.#name = name;
        this.#description = description;
        this.#category = category;
    }

    execute(){
        throw new Error("execute must be defined");
    }

    /**
     * @returns {String} name
     */

    getName(){
        return this.#name;
    }

    /**
     * @returns {String} category
     */

    getCategory(){
        return this.#category;
    }

    /**
     * @returns {String} description
     */

    getDescription(){
        return this.#description;
    }

    /**
     * @returns {String} usage
     */

    getUsage(){
        return "Vous devez faire `" + CLIENT.CONSTANTS.prefix + this.getName() + " " + this.#usage + "` !";
    }

    /**
     * @returns {String} alias
     */

    getAliases(){
        return this.#aliases;
    }


    /**
     * @returns {Array<String>} permissions
     */

    getPermissions(){
        return this.#permissions;
    }

    /**
     * 
     * @param {Array<String>} permissions 
     */

    setPermissions(permissions){
        this.#permissions = permissions;
    }


    /**
     * @param {Array<String>} aliases
     */

    setAliases(aliases){
        this.#aliases = aliases;
    }

    /**
     * @param {String} usage
     */

    setUsage(usage){
        this.#usage = usage;
    }
}

module.exports = Command;