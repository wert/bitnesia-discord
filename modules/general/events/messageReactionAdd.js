const { Event } = require('../../../handler');
const {checkSwear} = require('../../../Utils');

module.exports = class extends Event {
  constructor() {
    super('messageReactionAdd');
  }

  async run(bot,reaction,user) {
      //if(reaction.message.id != "718920693550415923") {return};
    if(user.bot) {return}
    if(reaction.emoji.name == "✅") {
        var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
        var memberRole = reaction.message.guild.roles.cache.find(role => role.name == "Newbie");
        member.roles.add(memberRole);
        reaction.remove();
        reaction.message.react("✅");
    }

  }
};