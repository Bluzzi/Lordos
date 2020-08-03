const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Test extends COMMAND {

    constructor(){
        super("test", "tkt", "Tester quelque chose.", [], "t");
    }

    execute(args, message) {
        EMBED.send("Test", message.channel, {color: 'RED', footer: "lol", title: "hey", timestamp: Date.now()});
    }
}

module.exports = Test;