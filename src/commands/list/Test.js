const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class Test extends COMMAND {

    constructor(){
        super("test", "tkt", "Tester quelque chose.", [], "t");
    }

    execute(args, message) {
        //for tests...
    }
}

module.exports = Test;