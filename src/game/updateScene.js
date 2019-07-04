const fs = require('fs');
const path = require('path');
const translateWorld = require('../world/translateWorld');
const { game: { afk } } = require('../configs/default');

/**
 * @desc Update the world render message with the updated data and saves the data file.
 * @param d
 * @param msg
 * @param memberId
 * @param world
 * @param newX
 * @param newY
 * @returns {Promise<Message>}
 */
function updateScene(d, msg, memberId, world, newX, newY) {
  d.expiry = Date.now() + afk;
  fs.writeFileSync(path.join(__dirname, `../saves/${memberId}.json`), JSON.stringify(world, null, 2));
  if (newX && newY) return msg.edit(translateWorld(d.member, world, newX, newY));
}

module.exports = updateScene;