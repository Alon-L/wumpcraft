class Help extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg, args) {
    if (!args.length) {
      this.commandNames = Array.from(client.commands.keys());
      this.longest = this.commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      const commands = client.commands;

      this.embed(
        msg.channel,
        `
<:sk:592764148924809222>
For arguments [] means required, <> means optional
Use **${this.prefix}help <command>** for more details about that command.

${commands.map(c => `**${this.prefix}${c.help.usage}**${''.repeat(this.longest - c.help.name.length)} - ${c.help.description}`).join('\n')}
        `,
        'main',
        'Commands');
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
    aliases: [],
    permLevel: 0
  },
  help: {
    name: `help`,
    description: `Get some information about the commands.`,
    usage: `help <command>`,
    helpSection: 'normal'
  }
};