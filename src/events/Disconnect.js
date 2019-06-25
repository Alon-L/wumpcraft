const { createEmojis } = require('../data');

class Disconnect extends require('../types/Events') {
  constructor() {
    super();
  }

  init(client) {
    console.log('Disconnected');
  }
}

module.exports = Disconnect;