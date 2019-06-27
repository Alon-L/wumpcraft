module.exports = {
  prefix: '!',
  embed: {
    colors: {
      error: '0xd30202',
      warn: '0xf7c820',
      success: '0x54d62c',
      main: '0x4286f4',
      log: '0x42b3f4'
    },
    footer: 'Hack Week'
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
    }
  }
};