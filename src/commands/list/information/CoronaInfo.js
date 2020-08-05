const COMMAND = require("../../Command");

class CoronaInfo extends COMMAND {
    
    constructor() {
        super("coronainfo", "Vous donne des informations concernant le coronavirus", "information");
    }
}