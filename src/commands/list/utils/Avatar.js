const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");
const ZORO = require("zoro-api");
class Avatar extends COMMAND {

    constructor(){
        super("avatar", "Voir la photo de profil d'une personne", "utils");

        this.setUsage("[mention]");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){

        if(!args[0]){
            EMBED.send(
                "",
                message.channel,
                {
                    "image": message.mentions.users.first() ?
                        message.mentions.users.first().displayAvatarURL()
                        : message.author.displayAvatarURL()
                }
            );
        }

        if(args[0]){

            let avatar = await message.mentions.users.first() ?
                await message.mentions.users.first().displayAvatarURL({ size: 512 }).replace(".webp", ".png")
                : await message.author.displayAvatarURL({ size: 512 }).replace(".webp", ".png")


            if(args[0] == "blur"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.blur(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "circle"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.circle(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "tv"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.tv(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "bw"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.bw(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "ps4"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.ps4(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "gay"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.gay(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "pixel"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.pixel(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "trash"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.trash(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "error"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.error(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }

            if(args[0] == "triggered"){
                const msg = await message.channel.send("Generating ...")
                let final = await ZORO.triggered(avatar)
                let attachment = new DISCORD.MessageAttachment(final, "final.png");
                message.channel.send(attachment) && msg.delete()
            }


        }


    }
}

module.exports = Avatar;