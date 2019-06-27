const Discord = require('discord.js');
const { embed: { colors: { main: color }, footer } } = require('../configs/default');

class Help extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg, args) {
    if (!args.length) {
      const commands = client.commands.sort((a, b) => a.help.priority - b.help.priority);

      const embedBuild = new Discord.RichEmbed()
        .setTitle('Commands')
        .setColor(color)
        .setTimestamp()
        .setFooter(footer);
      commands.forEach(c => {
        embedBuild.addField(`${this.prefix}${c.help.usage}`, c.help.description);
      });

      msg.channel.send({ embed: embedBuild });
    } else {
      if (client.commands.has(args[0])) {
        const command = client.commands.get(args[0]);
        this.embed(
          msg.channel,
          `${command.help.description}\nUsage: **${this.prefix}${command.help.usage}**`,
          'main',
          `« ${command.help.name.toUpperCase()} »`
        );
      }
    }
  }
}

module.exports = {
  run: Help,
  conf: {
    aliases: []
  },
  help: {
    name: 'help',
    description: 'Lists all the commands.',
    usage: 'help <command>',
    priority: 3
  }
};