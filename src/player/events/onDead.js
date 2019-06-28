const { getData } = require('../../data');
const { close } = require('../../game/close');
const deleteWorld = require('../../world/deleteWorld');

/**
 * @desc Handles the event when a player dies.
 * @param msg
 * @returns {boolean}
 */
function onDead(msg) {
  const d = getData(msg.member.id);
  if (!d) return false;
  close(20000, 'You Died! Game Over!\nScore: {SCORE}', d.world, msg.member);
  deleteWorld(msg.member.id);
  return false;
}

module.exports = onDead;