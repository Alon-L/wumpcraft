const fs = require('fs');
const path = require('path');

/**
 * @desc Checks if a world file exists.
 * @param id
 * @returns {boolean}
 */
function worldExists(id) {
  savesDir();
  return fs.existsSync(path.join(__dirname, `../saves/${id}.json`));
}

/**
 * @desc Create the saves directory if it does not exist.
 */
function savesDir() {
  if (!fs.existsSync(path.join(__dirname, '../saves/')))
    fs.mkdirSync(path.join(__dirname, '../saves/'));
}

module.exports = worldExists;