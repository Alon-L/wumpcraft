class Ready extends require('../types/Events') {
  constructor() {
    super();
  }

  init(client) {
    console.log('Ready');
  }
}

module.exports = Ready;