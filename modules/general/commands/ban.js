const { stripIndents } = require('common-tags');
const {colours} = require('../../../config.json')

const { Command } = require('../../../handler');
const Utils = require('../../../Utils.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor() {
    super('ban', {
      aliases: [],
      info: 'Ban someone',
      usage: 'ban <@user> [reason]',
      permission: ["Admin"],
    });
  }

  async run(message, args) {
      if(args.length == 0) {
          const msg = Utils.ErrorMsg("Incorrect Usage","You must use the following format: `ban <@user> [reason]` \n[] is optional, <> is required");
          message.channel.send(msg);
          return;
      };

      let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      if(!target) {
        const msg = Utils.ErrorMsg("Invalid user","I cannot seem to find that user in this discord");
        message.channel.send(msg);
        return;
      }
      let reason = (args.length > 1) ? args.join(" ").slice(22) : "No reason given";

      const embed = new MessageEmbed()
      .setTimestamp()
      .setAuthor("Ban Log", 'https://i.imgur.com/8WQ6OdT.png', 'https://bitnesia.net')
      .addField("Executor",message.author.tag + " `(" + message.author.id + ")`")
      .addField("Target", target.user.tag + " `(" + target.user.id + ")`")
      .addField("Reason", reason)
      .setColor(colours.red_light);

      target.ban({reason: "Executor: " + message.author.tag + " ID: (" + message.author.id + ") Reason: "+reason});
      message.guild.channels.cache.find(ch => ch.id === "719151767975362570").send(embed);
  }
};