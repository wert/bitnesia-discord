const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require("discord.js");
const {colours} = require('./config.json')

const rxp = require('./regex');

class Utils {
  /**
   * @description Read a directory recursively to get all files
   * @param {string} directory - The directory to read
   * @returns {Array<string>} All the paths to the files
   */
  static readdirSyncRecursive(directory) {
    let files = [];

    fs.readdirSync(directory).forEach(file => {
      const location = path.join(directory, file);

      // If the file is a directory read it recursively
      if (fs.lstatSync(location).isDirectory()) {
        files = files.concat(Utils.readdirSyncRecursive(location));
      } else {
        files.push(location);
      }
    });

    return files;
  }

  /**
   * @description Makes a boolean object Yes or No.
   * @param {boolean} bool - The boolean to stringify.
   * @returns {string} Boolean as Yes or No, accordingly.
   */
  static boolToString(bool) {
    if (typeof bool === 'boolean') {
      return bool ? 'Yes' : 'No';
    }
    return String(bool);
  }

  static noPermissions(user,perm) {
    let embed = new MessageEmbed()
    .setAuthor(user, 'https://i.imgur.com/8WQ6OdT.png', 'https://bitnesia.net')
    .setDescription(`You need the following rank(s): ${perm}`)
    .setColor(colours.red_dark)
    .setTimestamp();
    return embed;
  }

  static ErrorMsg(title,description) {
    let embed = new MessageEmbed()
    .setAuthor(title, 'https://i.imgur.com/8WQ6OdT.png', 'https://bitnesia.net')
    .setDescription(description)
    .setColor(colours.red_dark)
    .setTimestamp();
    return embed;
  }

  static checkSwear(text) {
    return text.match(rxp) ? true : false;
  }

}

module.exports = Utils;