const { getData } = require('../../data');
const { close } = require('../../game/close');
const deleteWorld = require('../../world/deleteWorld');

/**
 * @desc Handles the event when a player dies.
 * @param member
 * @returns {boolean}
 */
function onDead(member) {
  const d = getData(member.id);
  if (!d) return false;
  close(20000, 'You Died! Game Over!\nScore: {SCORE}', d.world, member);
  deleteWorld(member.id);
  return false;
}

module.exports = onDead;