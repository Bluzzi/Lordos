const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class EightBall extends COMMAND {

    constructor(){
        super("8ball", "Obtenir une réponse \"oui\" ou \"non\" à votre question", "fun");

        this.setUsage("<votre question>, votre question doit contenir un point d'interogation");
        this.setAliases(["8b"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0] || !args.join(" ").includes("?")) return false;

        let question = args.join(" ");

        let responses = [
            "Oui", "Bien sur", "Evidement", "Absolument", "Assurément", "Certainement", "Certes", "Sans doute",
            "Non", "Bien sur que non", "Evidement que non", "Absolument pas", "Assurément pas", "Certainement pas", "Pas du tout",
            "Peut-être", "Probablement", "Surement", "Éventuellement"
        ];

        let response = responses[Math.floor(Math.random() * (responses.length - 1))];

        EMBED.send(
            "**Question (de " + message.member.displayName + ") : **" + question + 
            "\n**Réponse : **" + response, 
            message.channel
        );
    }
}

module.exports = EightBall;