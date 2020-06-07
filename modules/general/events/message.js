const { Event } = require('../../../handler');
const {checkSwear} = require('../../../Utils');

module.exports = class extends Event {
  constructor() {
    super('message');
  }

  async run(bot,message) {
    
    if(checkSwear(message.content)) {
        message.delete();
        return
    };

  }
};