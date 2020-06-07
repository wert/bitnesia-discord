const { stripIndents } = require('common-tags');
const {colours} = require('../../../config.json')
const ms = require("ms");

const { Command } = require('../../../handler');
const Utils = require('../../../Utils.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor() {
    super('mute', {
      aliases: [],
      info: 'mute someone',
      usage: 'mute <@user> <1s/m/h/d> [reason]',
      permission: ["Helper","Moderator","Admin","Developer","Manager"],
    });
  }

  async run(message, args) {
      if(args.length < 2) {
          const msg = Utils.ErrorMsg("Incorrect Usage","You must use the following format: `mute <@user> <1s/m/h/d> [reason]` \n[] is optional, <> is required");
          message.channel.send(msg);
          return;
      };

      let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      if(!target) {
        const msg = Utils.ErrorMsg("Invalid user","I cannot seem to find that user in this discord");
        message.channel.send(msg);
        return;
      }
      let reason = (args.length > 2) ? args.join(" ").slice(26) : "No reason given";

      let mutedRole = message.guild.roles.cache.find(role => role.name == "Muted");

      let mutetime = args[1];

      const embed = new MessageEmbed()
      .setTimestamp()
      .setAuthor("Mute Log", 'https://i.imgur.com/8WQ6OdT.png', 'https://bitnesia.net')
      .addField("Executor",message.author.tag + " `(" + message.author.id + ")`")
      .addField("Target", target.user.tag + " `(" + target.user.id + ")`")
      .addField("Time", mutetime)
      .addField("Reason", reason)
      .setColor(colours.red_light);

      message.guild.channels.cache.find(ch => ch.id === "719151767975362570").send(embed);

      target.roles.add(mutedRole,`Muted by ${message.author.tag} for ${mutetime}. Reason: ${reason}`);

      setTimeout(function(){
        target.roles.remove(mutedRole);
      }, ms(mutetime));
  }
};