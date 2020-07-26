const EMBED = require('../utils/Embed');

class VoteMute {
    static execute(args, message) {
        let member = message.member;
        if(!member.roles.cache.map(r => r.name).includes('Noble')){
            EMBED.send(`Cette comme ne peut-être utilisée par un membre du tiers état...`, message.channel, 'RED');
        } else {
            let target = message.mentions.first();
            //todo
        }
    }
}

module.exports = VoteMute;