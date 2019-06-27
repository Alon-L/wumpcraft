const fs = require('fs');
const path = require('path');

/**
 * @desc Checks if a world file exists.
 * @param id
 * @returns {boolean}
 */
function worldExists(id) {
  return fs.existsSync(path.join(__dirname, `../saves/${id}.json`));
}

module.exports = worldExists;