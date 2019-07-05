const { game: { channels } } = require('../configs/default');

/**
 * @desc Creates a new game view channel if needed. Also takes care of the category.
 * @param msg
 * @returns {Promise<TextChannel>}
 */
async function createChannel(msg) {
  const category =
    msg.guild.channels.find(c => c.type === 'category' && c.name === channels.category)
    || await msg.guild.createChannel(channels.category, 'category', [{
      id: msg.guild.id,
      deny: ['VIEW_CHANNEL']
    }], 'Game category channel does not exist.');

  const channelName = channels.text.author(msg.author);

  const channel =
    msg.guild.channels.find(c => c.type === 'text' && c.name === channelName && c.parentID === category.id)
    || await msg.guild.createChannel(channelName, 'text', [{
      id: msg.author.id,
      allow: ['READ_MESSAGES']
    }, {
      id: msg.guild.id,
      deny: ['READ_MESSAGES', 'ADD_REACTIONS', 'SEND_MESSAGES']
    }, {
      id: msg.guild.me,
      allow: ['READ_MESSAGES', 'SEND_MESSAGES', 'ADD_REACTIONS']
    }]);

  await channel.setParent(category.id);
  return channel;
}

module.exports = createChannel;