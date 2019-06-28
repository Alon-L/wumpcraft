const { game: { channels } } = require('../configs/default');
const { createEmojis } = require('../data');

class Ready extends require('../types/Events') {
  constructor() {
    super();
  }

  async init(client) {
    console.log('Ready!');
    createEmojis(client.emojis);

    client.user.setPresence({ game: { name: `${this.prefix}help | WumpCraft`, status: 'online' } });
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