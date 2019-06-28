const Command = require('../types/Command');
const { getData } = require('../data');
const { close } = require('../game/close');

class Credits extends Command {
  constructor() {
    super();
  }

  run(client, msg) {
    const d = getData(msg.author.id);
    if (!d) return msg.channel.send('❌ You do not have an open game view.');
    close(0, 'User closed the game.', d.world, msg.member);
    msg.channel.send('🎮 You have successfully closed your game view.');
  }
}

module.exports = {
  run: Credits,
  conf: {
    aliases: []
  },
  help: {
    name: 'close',
    description: 'Close your open game view.',
    usage: 'close',
    priority: 3
  }
};