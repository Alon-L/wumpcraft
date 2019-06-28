const start = require('../game/start');

class Play extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg) {
    await start(msg);
  }
}

module.exports = {
  run: Play,
  conf: {
    aliases: []
  },
  help: {
    name: 'play',
    description: 'Play your world.',
    usage: 'play',
    priority: 0
  }
};