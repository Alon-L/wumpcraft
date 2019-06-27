const start = require('../game/start');

class Play extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg, args) {
    await start(client, msg);
  }
}

module.exports = {
  run: Play,
  conf: {
    aliases: [],
    permLevel: 0
  },
  help: {
    name: `play`,
    description: ``,
    usage: `play`,
    helpSection: 'normal'
  }
};