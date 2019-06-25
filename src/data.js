function createData() {
  module.exports.data = new Map();
}

function createEmojis(emojis) {
  module.exports.emojis = emojis;
}

module.exports = {
  createData,
  createEmojis
};