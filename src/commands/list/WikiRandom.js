const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const CONSTANTS = require("../../utils/Constants");
const Embed = require("../../utils/Embed");

var numbers = {};

class ChoiceNumber extends COMMAND {
    constructor() {
        super("wikirandom","wikir",">wikirandom");
    }

    async execute(args, message){
        Embed.send("[Découvrir une information !](https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard)", message.channel)
    }
}
module.exports = ChoiceNumber;