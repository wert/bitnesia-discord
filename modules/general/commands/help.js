const { MessageEmbed } = require('discord.js');
const { Command } = require('../../../handler');
const Utils = require('../../../Utils.js');
const {colours} = require('../../../config.json')

module.exports = class extends Command {
  constructor({ commandHandler }) {
    super('help', {
      aliases: ['h', 'commands', 'cmds'],
      info: 'Show all the commands or info about a specific command.',
      usage: 'help [command]',
      permission: ["everyone"],
    });

    this.commandHandler = commandHandler;
  }

  async run(message, args) {
    let maincmds = [];
    let modcmds = [];
    let admincmds = [];
    let devcmds = [];
    if (args.length === 0) {
        //element[0] is name
        //element[1] is options
        Array.from(this.commandHandler.commands).forEach(element => {

            if(element[1].permission.includes("everyone")) {
                maincmds.push(element[0]);
            }
            else if(element[1].permission.includes("Moderator")) {
                modcmds.push(element[0]);
            }
            else if(element[1].permission.includes("Admin")) {
                admincmds.push(element[0]);
            }
            else if(element[1].permission.includes("Developer")) {
                devcmds.push(element[0]);
            }
        });
        var embed = new MessageEmbed()
            .setTitle('Commands')
            .addField("Main Commands","`" + maincmds.join("`, `") + "`")
            .setTimestamp();
        
        message.member.roles.cache.some(role => role.name == "Moderator") ? embed.addField("Moderation Commands","`" + modcmds.join("`, `") + "`") : null;
        message.member.roles.cache.some(role => role.name == "Admin") ? embed.addField("Administrative Commands","`" + admincmds.join("`, `") + "`") : null;
        message.member.roles.cache.some(role => role.name == "Developer") ? embed.addField("Development Commands","`" + devcmds.join("`, `") + "`") : null;


        message.channel.send(embed);
    } else {
      let command = this.commandHandler.commands.get(args[0]);

      if (!command) {
        command = this.commandHandler.aliases.get(args[0]);
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle('Something went wrong!')
          .setDescription('Invalid command provided, please try again!');

        message.channel.send(embed);
        return;
      }

      const embed = new MessageEmbed()
        .addField("Usage","`" + command.usage + "`")
        .addField("Alias(es)","`" + command.aliases.join('`, `') + "`")
        .addField("Info", "`" + command.info + "`")
        .addField("Role(s) required", "`" + (command.permission.includes("everyone") ? "None" : command.permission.join('`, `')) + "`" )
        .setTimestamp()
        .setFooter("[] is optional, <> is required")
        .setColor(colours.purple_medium);
      message.channel.send(embed);
    }
  }
};
