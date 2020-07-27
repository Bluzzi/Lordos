const FUNCTION_PLUS = require("./FunctionPlus");

class CoolDiscordThings {

    static messageToEmoji(message){
        return this.messageToEmojiArray(message).join("");
    }

    static messageToEmojiArray(message){
        message = message.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        let alphabet = FUNCTION_PLUS.characterRange("a", "z");
        let numbers = FUNCTION_PLUS.range(0, 9).map(num => num.toString());
        
        let numbersName = [
            "zero", "one", "two", "three", "four", 
            "five", "six", "seven", "eight", "nine"
        ];

        return message.split("").map(function(char){
            char = char.toLowerCase();

            if(alphabet.includes(char)) return ":regional_indicator_" + char + ":";
            if(numbers.includes(char)) return ":" + numbersName[char] + ":";
            if(char === " ") return "   ";
            if(char === "\n") return "\n";

            return "**" + char + "**";
        });
    }
}

module.exports = CoolDiscordThings;