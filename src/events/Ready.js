const { close } = require('../game/close');
const { game: { channels } } = require('../configs/default');
const { data, createEmojis } = require('../data');

class Ready extends require('../types/Events') {
  constructor() {
    super();
  }

  async init(client) {
    console.log('Ready!');
    createEmojis(client.emojis);

    this.cleanChannels(client);
    this.setPresence(client);
    setInterval(Ready.checkAFK, 1000 * 10, client);
    setInterval(this.setPresence, 1000 * 60 * 5, client);
  }

  /**
   * @desc Deletes all expired game view channels.
   * @param client
   */
  cleanChannels(client) {
    client.guilds.forEach(guild => {
      const category = guild.channels.find(c => c.type === 'category' && c.name === channels.category);
      if (category) {
        guild.channels.forEach(c => {
          if (c.type === 'text' && c.parentID === category.id) c.delete('Invalid game channel.');
        });
      }
    });
  }

  /**
   * @desc Sets the client presence matching the amount of guilds it is in.
   * @param client
   */
  setPresence(client) {
    client.user.setPresence({ game: { name: `${client.guilds.size} servers | ${this.prefix}help`, status: 'online', type: 'WATCHING' } });
  }

  static checkAFK(client) {
    if (!data) return;
    const keys = data.keys();
    for (const authorId of keys) {
      const d = data.get(authorId);
      if (d.expiry <= Date.now()) {
        close(0, 'Member is AFK.', d.world, client.users.get(authorId), d.guildId, client.guilds);
      }
    }
  }
}

module.exports = {
  run: Ready,
  name: 'ready'
};