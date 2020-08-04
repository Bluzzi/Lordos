const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const CHOICE_NUMBER = require("./ChoiceNumber");
const CONSTANTS = require("../../../utils/Constants");

class Numbers extends COMMAND {
    constructor() {
        super("numbers");
    }
    
    async execute(args, message){
        let list = "";

        if(CHOICE_NUMBER.numbers[message.guild.id]){
            if(Object.keys(CHOICE_NUMBER.numbers[message.guild.id]).length !== 0){

                list = "Voici la liste des nombres choisis :\n";
    
                for(let [memberId, number] of Object.entries(CHOICE_NUMBER.numbers[message.guild.id])){
                    list = list + "\n" + message.guild.member(memberId).displayName + " : " + number;
                }

            } else {
                list = "Personne n'a choisi de nombre, vous pouvez en choisir via la commande ``" + CONSTANTS.prefix + "choicenumber`` !";
            }
        } else {
            list = "Personne n'a choisi de nombre, vous pouvez en choisir via la commande ``" + CONSTANTS.prefix + "choicenumber`` !";
        }
        

        EMBED.send(list, message.channel);
    }
}

module.exports = Numbers;