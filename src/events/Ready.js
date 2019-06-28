const { game: { channels } } = require('../configs/default');
const { createEmojis } = require('../data');

class Ready extends require('../types/Events') {
  constructor() {
    super();
  }

  async init(client) {
    this.client = client;
    console.log('Ready!');
    createEmojis(client.emojis);

    this.cleanChannels();
    this.setPresence(client.guilds.size);
    setInterval(this.setPresence, 1000 * 60 * 5, client.guilds.size);
  }

  /**
   * @desc Deletes all expired game view channels.
   */
  cleanChannels() {
    this.client.guilds.forEach(guild => {
      const category = guild.channels.find(c => c.type === 'category' && c.name === channels.category);
      if (category) {
        guild.channels.forEach(c => {
          if (c.type === 'text' && c.parentID === category.id) c.delete('Invalid game channel.');
        });
      }
    });
  }

  setPresence(guilds) {
    this.client.user.setPresence({ game: { name: `${guilds} servers | ${this.prefix}help`, status: 'online', type: 'WATCHING' } });
  }
}

module.exports = Ready;