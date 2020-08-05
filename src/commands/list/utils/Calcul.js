const EMBED = require("../../../utils/Embed");
const COMMAND = require("../../Command");

class Calcul extends COMMAND {

    constructor() {
        super("calcul", "Calcul une suite aritméthique", "utils");

        this.setUsage("<calcul>");
        this.setAliases(['calc']);
    }

    execute(args, message){
        if(!args[0]){
            return false;
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