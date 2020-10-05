const EMBED = require("../utils/Embed");

let separator = "\n\n";

class Information {

    /**
     * @param {string} header 
     */
    constructor(header){
        this.header = header + " :";
        this.information = [];
    }

    /**
     * 
     * @param {string} type Information name
     * @param {string} info Information 
     */
    addInformation(type, info){
        this.information.push("**" + type + " : **" + info);
    }

    toString(){
        let information = "**__" + this.header + "__**" + separator;

        this.information.forEach(info => information += info + separator);

        return information;
    }

    send(channel){
        EMBED.send(this.toString(), channel);
    }
}

module.exports = Information;