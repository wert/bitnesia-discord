const { Command } = require('../../../handler');
const { MessageEmbed } = require('discord.js');
const {colours} = require('../../../config.json')
const Utils = require('../../../Utils.js');

module.exports = class extends Command {
  constructor() {
    super('gen', {
      aliases: ['g'],
      info: 'Generates rules in the welcome and rules channel',
      usage: 'gen <rules/welcome>',
      permission: ["Developer"],
    });
  }

  async run(message, args) {

    if(args.length == 0) {
      const msg = Utils.ErrorMsg("Incorrect Usage","You must use the following format: `gen <rules/welcome>` \n[] is optional, <> is required");
      message.channel.send(msg);
      return;

    }


    const embed = new MessageEmbed()
      .setTimestamp()
      .setAuthor("Rules and Information", 'https://i.imgur.com/8WQ6OdT.png', 'https://bitnesia.net')
      .addField("Rules","\n\
      1. Treat everyone with respect. (No bullying/harassment/abuse)\n\
      2. No explicit language of any kind, this includes swearing and cursing.\n\
      3. Use an appropriate avatar and status message.\n\
      4. Avoid excessive messages, images, emojis and commands.\n\
      5. No sexually explicit, discriminatory, or gory content.   \n\
      6. No racism, sexism or anti-religion behavouir, we do not condone it.\n\
      7. Do not @ staff members without a valid reason.\n\
      8. No self promotion and/or advertising other communities or social media platforms (exception to Bitnesia)")
      .addField("Disclaimer(s)","\n\
      Rules are subject to change at any given time, it is up to you (the player) to review these.\n\
      Rule interpretation and enforcement is down to Bitenesia Staff Members\n\
      Rules are also subject to common sense\
      ")
      .setColor(colours.purple_medium);
    
    if(args[0] == "rules") {
      message.channel.send(embed);
    } else if(args[0] == "welcome") {
      message.channel.send(embed).then(msg => msg.react('✅'));
      
    }
  }
};