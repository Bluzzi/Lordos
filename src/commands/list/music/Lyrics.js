const COMMAND = require("../../Command");
const DISCORD = require("discord.js");
const AXIOS = require("axios").default;
const EMBED = require("../../../utils/Embed");
const COLOR = require("../../../utils/Color");
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
                    Authorization: "Bearer 04d1e22cf106d811505fe823d067ee10979b536f"
                },
                params: {
                    q: soundName
                }
            }
        ).then(response => {
            let data = response.data.data[0];
            let embed = new DISCORD.MessageEmbed();

            embed.setColor(COLOR.GREEN);

            embed.setTitle(data.artist + " - " + data.name);
            embed.setThumbnail(data.album_art);

            data.lyrics.split("\n\n").forEach(chunk => {
                for(let i = 0; i < chunk.length; i += 1023){
                    embed.addField("\u200b", chunk.substr(i, 1023));
                }
            });

            embed.setFooter("Paroles recherchés par KSoft.si");

            message.channel.send(embed);
        }).catch(error => {
            if(error.response.status === 404){
                EMBED.send("Aucunes paroles trouvés pour ce titre.", message.channel, {color: COLOR.RED});
            }
        });
    }
}

module.exports = Lyrics;