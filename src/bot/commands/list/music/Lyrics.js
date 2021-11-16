const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const AXIOS = require("axios").default;
const EMBED = require("../../../utils/Embed");
const COLOR = require("../../../utils/ColorConstants");
const MUSIC_MANAGER = require("../../../music/MusicManager");

class Lyrics extends COMMAND {

    constructor(){
        super("lyrics", "Obtenir les paroles de la musique joué", "music");

        this.setUsage("(nom de la musique)");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        // Get the sound name :
        let soundName;

        if(args[0]){
            soundName = args.join(" ");
        } else {
            soundName = MUSIC_MANAGER.getInstance(message.guild).nowPlaying;

            if(soundName){
                soundName = soundName.author.name + " " + soundName.title;
            } else {
                return false;
            }
        }

        // Send the lyrics :
        AXIOS.get(
            "https://api.ksoft.si/lyrics/search",
            {
                headers: {
                    Authorization: "Bearer 04744c462d4c23f68c22d913156dc712abe281bb"
                },
                params: {
                    q: soundName
                }
            }
        ).then(response => {
            let data = response.data.data[0];
            let embed = new DISCORD.MessageEmbed();

            // Format embed :
            embed.setColor(COLOR.GREEN);

            embed.setTitle(data.artist + " - " + data.name);
            embed.setThumbnail(data.album_art);

            embed.setFooter("Paroles recherchés par KSoft.si");

            // Format lyrics :
            let currentContent = "";
            let globalContentLength = 0;
            
            let fieldCount = 0;

            let addField = function (newLine = ""){
                embed.addField("\u200b", currentContent);

                fieldCount++;
                globalContentLength += currentContent.length;

                currentContent = newLine;
            }

            data.lyrics.split("\n\n").every(chunk => {
                let lines = chunk.split("\n");

                for(let key in lines){
                    if(lines[key].length + currentContent.length > 1023){
                        addField(lines[key]);
                    } else {
                        currentContent += lines[key] + "\n";
                    }
                }

                if(currentContent.length > 0) addField();

                // Max field detection :
                if(fieldCount >= 24 || globalContentLength > 5000){
                    embed.addField("\u200b", "Voir les paroles entières : " + data.url);
                    return false;
                }

                return true;
            });

            // Send embed :
            message.channel.send({embeds: [embed]});
        }).catch(error => {
            EMBED.reply("Aucunes paroles trouvés pour ce titre.", message, {color: COLOR.RED});
        });
    }
}

module.exports = Lyrics;