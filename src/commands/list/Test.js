const COMMAND = require("../Command");
const EMBED = require("../../utils/Embed");
const DISCORD = require("discord.js");
const VOICE = require("../../utils/Voice");

class Test extends COMMAND {

    constructor(){
        super("test", "tkt", "utils");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        console.log(await VOICE.info("https://www.youtube.com/watch?v=tzVJPgCn-Z8"));

        AXIOS.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${escape(args.join(" "))}&key=${API_KEY}`).then(async response => {
    }
}

module.exports = Test;