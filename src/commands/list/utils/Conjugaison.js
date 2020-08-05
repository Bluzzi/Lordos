const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const CONJ = require("conjugation-fr");

// See : https://www.npmjs.com/package/conjugation-fr

let help = "__**infinitive: infinitif**__\n\n   -infinitive-present: infinitif présent\n\n __**indicative: indicatif**__\n\n   -present: présent\n   -imperfect: imparfait\n   -future: futur\n   -simple-past: passé simple\n   -perfect-tense: passé composé\n   -pluperfect: plus-que-parfait\n   -anterior-past: passé antérieur\n   -anterior-future: futur antérieur\n\n __**conditional: conditionnel**__\n\n   -present: présent\n   -conditional-past: passé conditionnel\n\n __**subjunctive: subjonctif**__\n\n   -present: présent\n   -imperfect: imparfait\n   -subjunctive-past: subjonctif passé\n   -subjunctive-pluperfect: subjonctif plus-que-parfait\n\n __**imperative: impératif**__\n\n   -imperative-present: impératif présent\n   -imperative-past: impératif passé\n\n __**participle: participe**__\n\n   -present-participle: participe présent\n   -past-participle: participe passé";
class Conjugaison extends COMMAND {

    constructor(){
        super("conjugaison", "Renvoie la conjugaison d'un verbe", "utils");

        this.setUsage("help");
        this.setAliases(['conj']);
    }

    execute(args, message){
        if(args[0] == "help"){
            EMBED.send(this.getUsage() + "\n\nUtilisez le mot anglais !\n\n" + help, message.channel);
            return;
        }
        else{
            try{
                let conj = CONJ.conjugate(args[0], args[1], args[2])
                let text = "__Conjugaison de **" + args[0] + "** :__\n";
                for(let person of conj){
                    text += "\n -" + person.pronoun + " " + person.verb;
                }
                EMBED.send(text, message.channel);
            }
            catch(error){
                console.log(error)
                EMBED.send("Vérifiez si le verbe, le mode et le temps existent et correspondent. __>conj help__", message.channel);
            }
        }
    }
}

module.exports = Conjugaison;