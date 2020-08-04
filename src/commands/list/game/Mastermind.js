const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

let emojis = ["⬜","🟧","🟥","🟦","🟫","🟪","🟩","🟨","◀️","▶️","✅"];



class Mastermind extends COMMAND{
    constructor(){
        super("mastermind", "play|rules", "Play the mastermind game.", [])
    }

    async execute(args, message){
        if(!args[0]){
            EMBED.send(this.getUsage(),message.channel);
            return;
        }
        switch(args[0]){
            case "play":
                this.start_game(message);
                break;
            case "rules":
                this.showRules(message);
                break;
        }
    }

    // Play the game :
    start_game(message){

        // Variables : previous codes / the code to find / simple text for the message / the current code / list to manage the moving arrow / ...
        let previousCodes = "";
        let codeToFind = this.createCode();
        let text = "**<MASTERMIND>** \nVous devez trouver le code généré par Lordos\n__Codes précédents :__\n";
        let currentCode = ["🔲","🔲","🔲","🔲","🔲"];
        let arrow = ["⬆️","✴️","✴️","✴️","✴️"]
        let currentCodeIndex = 0;
        let debug = "";
        let attempt = 0;

        EMBED.send(text + previousCodes + "__Code actuel :__\n" + currentCode.join("") + "\n" + arrow.join("") + debug, message.channel).then((msg) =>{

            //Add reactions to the message :
            for(let em of emojis) msg.react(em);
            

            // Create ReactionCollector :
            let filter = (reaction, user) => {return emojis.includes(reaction.emoji.name) && user.id === message.author.id;}
            let collector = msg.createReactionCollector(filter, {time:1800000}) //temps maximum de 30 minutes

            // Get Reaction on react, then edit the message :
            collector.on('collect', (reaction, reactionCollector) => {
                debug = "";
                if(emojis.includes(reaction.emoji.name)){
                    if(!currentCode.includes(reaction.emoji.name)){
                        switch(reaction.emoji.name){
                            case "◀️":
                                // Select the previous index :
                                arrow[currentCodeIndex] = "✴️";
                                currentCodeIndex -= 1;
                                if(currentCodeIndex < 0) currentCodeIndex = 4;
                                arrow[currentCodeIndex] = "⬆️";
                                break;
                            case "▶️":
                                // Select the next index : 
                                arrow[currentCodeIndex] = "✴️";
                                currentCodeIndex += 1;
                                if(currentCodeIndex > 4) currentCodeIndex = 0;
                                arrow[currentCodeIndex] = "⬆️";
                                break;
                            case "✅":
                                // Full code verification :
                                if(currentCode.includes("🔲")){
                                    debug = "```yaml\nLe code doit être constitué de 5 couleurs.```"
                                    break;
                                }
                                attempt += 1;
                                // Win verification :
                                if(currentCode.join("") === codeToFind.join("")){
                                    debug = "```arm\nVous avez gagné en ```" + attempt + "essai(s) !```";
                                    collector.stop("stop")
                                }
                                else{
                                    if(attempt == 10){
                                        debug = "```arm\nVous avez perdu car vous n'avez pas réussi en 10 essais !```";
                                        collector.stop("stop")
                                    }
                                }
                                // Reply text constructor :
                                let codeToRegister = ""
                                for(let i = 0; i < 5; i++){
                                    if(codeToFind.includes(currentCode[i]) && currentCode[i] === codeToFind[i]){
                                        codeToRegister += "🚩";
                                    }
                                    else if(codeToFind.includes(currentCode[i])){
                                        codeToRegister += "🏳️";
                                    }
                                }

                                // Add code and result to previous codes :
                                previousCodes += currentCode.join("") + "    résultat :" + codeToRegister + "\n";

                                // Reset lists :
                                currentCode = ["🔲","🔲","🔲","🔲","🔲"];
                                arrow = ["⬆️","✴️","✴️","✴️","✴️"]
                                currentCodeIndex = 0;
                                break;
                            default:
                                // Set the color into the code :
                                currentCode[currentCodeIndex] = reaction.emoji.name;
                                break;
                        }
                    }
                    else{
                        debug = "```yaml\nLe code ne peut contenir chaque couleur qu'une seule fois.\n```";
                    }
                    // Edit the EMBED message by sending a new one :
                    let newEmbd = new DISCORD.MessageEmbed().setDescription(text + previousCodes + "__Code actuel :__\n" + currentCode.join("") + "\n" + arrow.join("") + debug);
                    msg.edit(newEmbd);
                    
                }

                // Remove reactions from users :
                msg.reactions.resolve(reaction.emoji.name).users.remove(message.author);
            })

            // If collector ends by time's up :
            collector.on('end', (collected, reason) => {
                if(reason != "stop"){
                    let newEmbd = new DISCORD.MessageEmbed().setDescription("**<MASTERMIND>**\n```arm\nLe jeu est fini, vous avez perdu car vous avez passé le temps réglementaire de 30 minutes.```");
                    msg.edit(newEmbd);
                }
              });
        })
    }

    // Generate code function :
    createCode(){
        let colors = ["⬜","🟧","🟥","🟦","🟫","🟪","🟩","🟨"];

        let code = []
        for(let i = 0; i < 5; i++){
            let index = Math.floor(Math.random() * colors.length)
            code.push(colors[index]);
            colors.splice(index, 1);
        }
        return code
    }

    //Show the mastermind's rules :
    showRules(message){
        EMBED.send("**<MASTERMIND>**\n__Règles :__\n\n*But du jeu :*\nLe but est de trouver le code constitué de 5 couleurs généré par Lordos.\n\n*Jouer un tour :*\n A chaque tour, vous pouvez proposer un code.\n\nA la fin du tour, le bot renvoie pour chaque couleur,\n-un drapeau rouge si la couleur est à la bonne place dans le code.\n-un drapeau blanc si la couleur existe dans le code mais n'est pas à la bonne place.\n-rien si la couleur n'est pas dans le code.\n\nTemps maximum : 30 minutes\nEssais maximum : 10", message.channel)
    }
}

module.exports = Mastermind;