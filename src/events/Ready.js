const { createEmojis } = require('../data');

class Ready extends require('../types/Events') {
  constructor() {
    super();
  }

  init(client) {
    console.log('Ready!');
    createEmojis(client.emojis);
  }
}

module.exports = Ready;