const world = require('../configs/world');
const translateWorld = require('../utils/translateWorld');
const movement = require('../utils/movement');

class Play extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg, args) {
    const _msg = await msg.channel.send(translateWorld(client.emojis, world, world.player.position.x, world.player.position.y));
    await movement(_msg, msg.author);
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