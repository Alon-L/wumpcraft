const Command = require('../types/Command');

class Ping extends Command {
  constructor() {
    super();
  }

  run(client, msg, args) {
    this.embed(msg.channel, `Pong! *${client.ping}ms*`, 'main');
  }
}

module.exports = {
  run: Ping,
  conf: {
    aliases: [],
    permLevel: 0
  },
  help: {
    name: `ping`,
    description: `Pong.`,
    usage: `ping`,
    helpSection: 'normal'
  }
};