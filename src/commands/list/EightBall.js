const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");

class EightBall extends COMMAND {

    constructor() {
        super(
            "8ball",
            "(votre question), votre question doit contenir un point d'interogation", 
            "Obtenir une réponse aléatoire à votre question.", 
            [], 
            "8b"
        );
    }

    async execute(args, message){
        if(!args[0] || !args.join(" ").includes("?")) return false;

        let question = args.join(" ");

        let responses = [
            "Oui", "Bien sur", "Evidement", "Absolument", "Assurément", "Certainement", "Certes", "Sans doute",
            "Non", "Bien sur que non", "Evidement que non", "Absolument pas", "Assurément pas", "Certainement pas", "Pas du tout",
            "Peut-être", "Probablement", "Surement", "Éventuellement"
        ];

        let response = responses[Math.floor(Math.random() * (responses.length - 1))];

        if(question.startsWith("Bluzzi est meilleur que")) response = "Oui"; // :)

        EMBED.send(
            "**Question (de " + message.member.displayName + ") : **" + question + 
            "\n**Réponse : **" + response, 
            message.channel
        );
    }
}

module.exports = EightBall;