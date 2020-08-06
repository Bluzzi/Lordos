const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

var voters = [];

class VoteMute extends COMMAND {

    constructor(){
        super("votemute", "Permet de voter pour le mute d'un utilisateur du vocal", "moderation");
        
        this.setUsage("<mention>");
        this.setAliases(["vm"]);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        let member = message.member;

        if(!member.roles.cache.map(r => r.name).includes("Noble")){
            EMBED.send("Cette commande ne peut-être utilisée par un membre du tiers état...", message.channel, "RED");
        } else {
            if(args[0] === "cancel"){
                let lastTarget = voters[member.user.id];

                delete voters[member.user.id];

                EMBED.send("Vous avez supprimé votre vote !", message.channel, "RED");
                
                 // UnMute :
                lastTarget = message.guild.members.cache.get(lastTarget);

                if(lastTarget && this.getVoteCount(lastTarget) <= 4 && lastTarget.voice.mute) {
                    lastTarget.voice.setMute(false);

                    EMBED.send(`**${lastTarget.user.username}** a été unmute car il n'y avait plus assez de votes contre lui !`, message.channel, 'GREEN');
                }
            } else {
                // Mute :
                if(Object.keys(voters).includes(member.user.id)){
                    return EMBED.send(`Vous avez déjà voté ! Vous pouvez le supprimer avec ${CLIENT.CONSTANTS.prefix}votemute cancel`, message.channel, 'RED');
                }
                
                let target = message.mentions.members.first();

                if(!target) return EMBED.send(`Utilisation invalide, essayez  : ${CLIENT.CONSTANTS.prefix}votemute <user>`, message.channel, 'RED');
                if(!target.voice.channel) return EMBED.send(`**${target.user.username}** n'est pas connecté(e) dans un salon vocal !`, message.channel, 'RED');
              
                voters[member.user.id] = target.user.id;

                let voteCount = this.getVoteCount(target.user.id)

                if(voteCount <= 4){
                    EMBED.send(`**${target.user.username}** a désormais ${voteCount} vote(s) !`, message.channel, 'RED');
                } else {
                    target.voice.setMute(true);

                    EMBED.send(`**${target.user.username}** a été mute !`, message.channel, 'GREEN');
                }
            }
        }
    }

    getVoteCount(id){
        return Object.values(voters).filter(v => v == id).length;
    }
}

module.exports = VoteMute;