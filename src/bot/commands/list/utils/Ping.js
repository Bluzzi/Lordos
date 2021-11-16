const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const PING = require("ping");
const DISCORD = require("discord.js");

class Ping extends COMMAND {
    
    constructor(){
        super("ping", "Permet de ping une adresse", "utils");

        this.setUsage("<adresse> ['numeric']");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if (!args[0]) {
            return false;
        } else {
            let address = args[0];
            let numeric_address = args[1] == "numeric";

            PING.promise.probe(address, {extra: [process.platform == 'win32' ? '-n' : '-c', '3']}).then(res => {
                if(res.alive){
                    EMBED.reply(`Résultat du ping (*${numeric_address == true ? res.numeric_host : res.host}*) :\`\`\`\nMin: ${parseInt(res.min)}ms\nMax: ${parseInt(res.max)}ms\nMoyenne: ${parseInt(res.avg)}ms\nPacket Loss: ${parseInt(res.packetLoss)}\`\`\``, message, 'GREEN');
                } else {
                    EMBED.reply(`L'adresse n'est pas résolvable !`, message, 'RED');
                }
            })
        }
    }
}

module.exports = Ping;