const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const CONSTANTS = require("../../utils/Constants");

class Calcul extends COMMAND {

    constructor() {
        super("calcul");
    }

    execute(args, message){
        if(!args[0]){
            EMBED.send("Vous devez faire ``" + CONSTANTS.prefix + this.name + " (votre calcul)`` pour obtenir le resultat.", message.channel);
        } else {
            // Define authorized calculation characters :
            let authorizedChars = [...Array(10).keys()].map(char => char.toString());

            authorizedChars.push("*", "+", "-", "%", "/", "(", ")", "%", ".");

            // Calculate and send the result or error :
            let calcul = args.join("").split("").filter(char => authorizedChars.includes(char)).join("");
            let result = "";

            try {
                result = eval(calcul).toString();
            } catch(error){
                if(error instanceof SyntaxError){
                    result = "erreur de syntaxe";
                } else {
                    result = "erreur inconnue";
                }
            }

            if(calcul === "") calcul = "null";

            EMBED.send("``" + calcul + "`` = ``" + result + "``", message.channel);
        }
    }
}

module.exports = Calcul;