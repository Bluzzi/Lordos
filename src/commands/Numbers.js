const EMBED = require("../utils/Embed");
const CHOICE_NUMBER = require("./ChoiceNumber");
const CONSTANTS = require("../utils/Constants");

class Numbers {

    static execute(args, message){
        let list = "";

        if(Object.keys(CHOICE_NUMBER.numbers).length !== 0){
            list = "Voici la liste des nombres choisis :\n";

            for(let [memberId, number] of Object.entries(CHOICE_NUMBER.numbers)){
                list = list + "\n" + message.guild.member(memberId).displayName + " : " + number;
            }
        } else {
            list = "Personne n'a choisi de nombre, vous pouvez en choisir via la commande ``" + CONSTANTS.prefix + "choicenumber`` !";
        }

        EMBED.send(list, message.channel);
    }
}

module.exports = Numbers;