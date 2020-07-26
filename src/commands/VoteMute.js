const EMBED = require('../utils/Embed');

var voters = [];

class VoteMute {
    static execute(args, message) {
        let member = message.member;
        if(!member.roles.cache.map(r => r.name).includes('Noble')){
            EMBED.send(`Cette commande ne peut-être utilisée par un membre du tiers état...`, message.channel, 'RED');
        } else {
            if (args[0] == "cancel") {
                let lastTarget = voters[member.user.id];
                delete voters[member.user.id];
                EMBED.send(`Vous avez supprimé votre vote !`, message.channel, 'RED');
                
                //unmute:
                lastTarget = message.guild.members.cache.get(lastTarget);
                if(lastTarget && getVoteCount(lastTarget) <= 4) {
                    lastTarget.voice.setMute(false);
                    EMBED.send(`**${lastTarget.user.username}** a été unmute car il n'y avait plus assez de votes contre lui !`, message.channel, 'GREEN');
                }
            } else {
                if (Object.keys(voters).includes(member.user.id)) return EMBED.send(`Vous avez déjà voté ! Vous pouvez le supprimer avec ${CLIENT.CONSTANTS.prefix}votemute cancel`, message.channel, 'RED');
                
                let target = message.mentions.members.first();

                if(!target) return EMBED.send(`Utilisation invalide, essayez  : ${CLIENT.CONSTANTS.prefix}votemute <user>`, message.channel, 'RED');
                if(!target.voice.channel) return EMBED.send(`**${target.user.username}** n'est pas connecté(e) dans un salon vocal !`, message.channel, 'RED');
              
                voters[member.user.id] = target.user.id;
                let voteCount = getVoteCount(target.user.id)
                if (voteCount <= 4) {
                    EMBED.send(`**${target.user.username}** a désormais ${voteCount} vote(s) !`, message.channel);
                } else {
                    target.voice.setMute(true);
                    EMBED.send(`**${target.user.username}** a été mute !`, message.channel, 'GREEN');
                }
            }
        }
    }
}

function getVoteCount(id) {
    console.log(Object.values(voters))
    return Object.values(voters).filter(v => v == id).length;
}

module.exports = VoteMute;