const { Command } = require('../../../handler');
const { MessageEmbed } = require('discord.js');
const {colours} = require('../../../config.json')

module.exports = class extends Command {
  constructor() {
    super('info', {
      aliases: ['ip'],
      info: 'Returns server information',
      usage: 'info',
      permission: ["everyone"],
    });
  }

  async run(message) {
    const embed = new MessageEmbed()
    .setTimestamp()
    .setAuthor("Server Information", 'https://i.imgur.com/8WQ6OdT.png', 'https://bitnesia.net')
    .addField("Website","https://bitnesia.net")
    .addField("Store","https://store.bitnesia.net")
    .addField("Server IP","play.bitnesia.net")
    .setColor(colours.purple_medium);

    message.channel.send(embed);
  }
};