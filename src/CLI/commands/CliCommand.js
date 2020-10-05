class CliCommand {

    #name;
    #usage;
    #description;

    /**
     * @param {string} name 
     * @param {string} description 
     */
    constructor(name, description){
        this.#name = name;
        this.#description = description;
    }

    getName(){
        return this.#name;
    }

    getUsage(){
        return this.getName() + " " + this.#usage;
    }

    /**
     * @param {string} usage 
     */
    setUsage(usage){
        this.#usage = usage;
    }

    getDescription(){
        return this.#description;
    }

    getAliases(){
        return [this.#name];
    }
}

module.exports = CliCommand;