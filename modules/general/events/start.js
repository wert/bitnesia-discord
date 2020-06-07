const { Event } = require('../../../handler');

module.exports = class extends Event {
  constructor() {
    super('ready');
  }

  run(bot) {
    console.log(`Logged in as ${bot.user.tag}`);
  }
};