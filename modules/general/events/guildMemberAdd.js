const { Event } = require('../../../handler');

module.exports = class extends Event {
  constructor() {
    super('guildMemberAdd');
  }

  async run(bot,member) {
    const count = `Members: ${member.guild.memberCount}`;
    member.guild.channels.cache.find(ch => ch.id === "551502763029430273").edit({ name: `${count}` });
  }
};