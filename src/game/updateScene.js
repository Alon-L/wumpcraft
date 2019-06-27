const translateWorld = require('../world/translateWorld');

/**
 * @desc Update the world render message with the updated data.
 * @param msg
 * @param world
 * @param newX
 * @param newY
 * @returns {Promise<Message>}
 */
function updateScene(msg, world, newX, newY) {
  return msg.edit(translateWorld(world, newX, newY));
}

module.exports = updateScene;