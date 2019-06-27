class Error extends require('../types/Events') {
  constructor() {
    super();
  }

  init(error) {
    console.error(error);
  }
}

module.exports = Error;