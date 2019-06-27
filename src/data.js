/**
 * @desc Creates the data map that will be used to store all the players' world game view data.
 */
function createData() {
  module.exports.data = new Map();
}

/**
 * @desc Get the value from the data map matching the key.
 * @param key
 * @returns {*}
 */
function getData(key) {
  return module.exports.data.has(key)
    ? module.exports.data.get(key)
    : false;
}

/**
 * @desc Creates a global Discord.js collection for all the client's emojis.
 * @param emojis
 */
function createEmojis(emojis) {
  module.exports.emojis = emojis;
}

module.exports = {
  createData,
  createEmojis,
  getData
};