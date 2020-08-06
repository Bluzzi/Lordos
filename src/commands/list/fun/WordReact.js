const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

const LETTERS = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];

class WordReact extends COMMAND {
    
    constructor(){
        super("worldreact", "Permet de réagir à un message via son id avec un mot", "fun");

        this.setUsage("<id du message> <word>");
        this.setAliases(["wr"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0] || !args[1]) return false;
        
        let word = args[1].toLowerCase();

        for(let letter of word){
            if(letter.charCodeAt(0) < 97 || letter.charCodeAt(0) > 122){
                EMBED.send("Les caractères ne peuvent être que des lettres sans accents.", message.channel);
                return;
            }
            
            if(word.split(letter).length > 2){
                EMBED.send("Une lettre ne peut pas apparaitre deux fois en tant que réaction.", message.channel);
                return;
            }
        }

        message.channel.messages.fetch(args[0]).then(msg => {
            for(let letter of word) msg.react(LETTERS[letter.charCodeAt(0) - 97]);
        });
    }
}

module.exports = WordReact;