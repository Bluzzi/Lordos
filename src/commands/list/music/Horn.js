const COMMAND = require("../../Command");
const VOICE = require("../../../utils/Voice");
const EMBED = require("../../../utils/Embed");

class Horn extends COMMAND {
    constructor(){
        super("horn");
    }

    async execute(args, message){
        let voiceChannel = message.member.voice.channel;
        if(voiceChannel){
            let connection = await VOICE.connect(voiceChannel);

            EMBED.send('POUEEEEEET', message.channel, 'GREEN');
            await VOICE.playYoutube(connection, this.getRandomHorn(), {volume: 0.3, seek: 0, bitrate: 128});
            setTimeout(() => {
                VOICE.disconnect(voiceChannel);
            }, 10000);
        } else {
            EMBED.send("Il faut  être connecté en vocal pour utiliser cette commande", message.channel, 'RED');
        }
    }

    getRandomHorn(){
        let horns = ["https://www.youtube.com/watch?v=HKzI8PENT2A", "https://www.youtube.com/watch?v=UaUa_0qPPgc", "https://www.youtube.com/watch?v=PRc2vx4xTVM", "https://www.youtube.com/watch?v=J_KwDFpL7iM&list=PLu26OMk6YLFzxAu3mIgPNLrBO0b-KWyu3", "https://www.youtube.com/watch?v=5nyRwpCsqJQ&list=PLu26OMk6YLFzxAu3mIgPNLrBO0b-KWyu3&index=3", "https://www.youtube.com/watch?v=-QiHjgDR05k&list=PLu26OMk6YLFzxAu3mIgPNLrBO0b-KWyu3&index=5"];
        return horns[Math.floor(Math.random()*(horns.length-1 - 1+1)+1)];
    }
}

module.exports = Horn;