const Command = require('../types/Command');

class Ping extends Command {
  constructor() {
    super();
  }

  run(client, msg) {
    msg.channel.send(`⏱ Pong! \`${Math.round(client.ping)}\``);
  }
}

module.exports = {
  run: Ping,
  conf: {
    aliases: []
  },
  help: {
    name: 'ping',
    description: 'Replies with the bot reaction time.',
    usage: 'ping',
    priority: 4
  }
};