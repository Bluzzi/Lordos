const EMBED = require("../../../utils/Embed");
const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const CALCUL_MENTAL = require("../game/Calculmental")

class Calcul extends COMMAND {

    constructor(){
        super("calcul", "Calcul une suite aritméthique", "utils");

        this.setUsage("<calcul>");
        this.setAliases(['calc']);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
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

            EMBED.reply("``" + calcul + "`` = ``" + result + "``", message);
        }
    }
}

module.exports = Calcul;