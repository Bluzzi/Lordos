const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");


class Flip extends COMMAND {

    constructor(){
        super("flip", "Lance une pièce", "fun");
    }

    async execute(args, message){

        let result = ["pile", "face"];

        EMBED.send("La pièce est tombé sur : **" + result[Math.floor(Math.random() * Math.floor(2))] + "**", message.channel);
        

    }

}

module.exports = Flip;