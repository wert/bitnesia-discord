const { Event } = require('../../../handler');

module.exports = class extends Event {
  constructor() {
    super('guildMemberRemove');
  }

  async run(bot,member) {
    const count = `Members: ${member.guild.memberCount}`;
    member.guild.channels.cache.find(ch => ch.id === "718913528408440853").edit({ name: `${count}` });
  }
};