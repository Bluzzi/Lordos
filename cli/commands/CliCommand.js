class CliCommand {
    #name;
    #usage;
    #description;

    constructor(name, usage = "", description = ""){
        this.#name = name;
        this.#usage = usage;
        this.#description = description;
    }

    getName(){
        return this.#name;
    }

    getUsage(){
        return this.getName() + " " + this.#usage;
    }

    getDescription(){
        return this.#description;
    }

    getAlias(){
        return this.#name;
    }
}

module.exports = CliCommand;