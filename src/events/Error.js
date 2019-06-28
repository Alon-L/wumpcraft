class Error extends require('../types/Events') {
  constructor() {
    super();
  }

  init(client, error) {
    console.error(error);
  }
}

module.exports = Error;