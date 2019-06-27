const Discord = require('discord.js');
const { embed: embedConf } = require('../configs/default');

function embed(channel, desc, type, title = '') {
    const color = embedConf.colors[type.toLowerCase()];
    const embedBuild = new Discord.RichEmbed()
      .setTitle(title)
      .setColor(color)
      .setDescription(desc)
      .setTimestamp()
      .setFooter(embedConf.footer);
    channel.start({ embed: embedBuild });
}

module.exports = embed;