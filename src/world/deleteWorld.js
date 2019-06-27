const fs = require('fs');
const path = require('path');
const worldExists = require('./worldExists');

/**
 * @desc Deletes the world file if exists.
 * @param authorId
 */
function deleteWorld(authorId) {
  if (worldExists(authorId)) {
    fs.unlinkSync(path.join(__dirname, `../saves/${authorId}.json`));
  }
}

module.exports = deleteWorld;