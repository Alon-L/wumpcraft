const { close } = require('../game/close');
const { game: { channels } } = require('../configs/default');
const { createEmojis, data } = require('../data');

class Ready extends require('../types/Events') {
  constructor() {
    super();
  }

  async init(client) {
    console.log('Ready!');
    createEmojis(client.emojis);

    /**
     * @desc Deletes all expired game view channels.
     */
    client.guilds.forEach(guild => {
      const category = guild.channels.find(c => c.type === 'category' && c.name === channels.category);
      if (category) {
        guild.channels.forEach(c => {
          if (c.type === 'text' && c.parentID === category.id) c.delete('Invalid game channel.');
        });
      }
    });
  }
}

module.exports = Ready;