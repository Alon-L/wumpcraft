const fs = require('fs');
const path = require('path');
const translateWorld = require('../world/translateWorld');

/**
 * @desc Update the world render message with the updated data and saves the data file.
 * @param msg
 * @param memberId
 * @param world
 * @param newX
 * @param newY
 * @returns {Promise<Message>}
 */
function updateScene(msg, memberId, world, newX, newY) {
  fs.writeFileSync(path.join(__dirname, `../saves/${memberId}.json`), JSON.stringify(world, null, 2));
  if (newX && newY) return msg.edit(translateWorld(world, newX, newY));
}

module.exports = updateScene;