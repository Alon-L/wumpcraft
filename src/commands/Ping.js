const Command = require('../types/Command');

class Ping extends Command {
  constructor() {
    super();
  }

  run(client, msg) {
    this.embed(msg.channel, `Pong! *${Math.round(client.ping)}ms*`, 'main');
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