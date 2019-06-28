const { version } = require('../../package');

module.exports = {
  prefix: 'w!',
  embed: {
    colors: {
      main: '87a8e0',
    },
    footer: `WumpCraft | v${version}`
  },
  game: {
    channels: {
      category: 'games',
      text: {
        member: (member) => `${member.user.username.toLowerCase()}-${member.user.discriminator}`,
        author: (author) => `${author.username.toLowerCase()}-${author.discriminator}`
      }
    },
    blocks: {
      default: 'sky'
    },
    player: {
      maxHearts: 10
    },
    afk: 120 * 1000
  }
};