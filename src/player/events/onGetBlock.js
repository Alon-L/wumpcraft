const achievementsConf = require('../../configs/achievements');
const addAchievement = require('../achievements/addAchievement');
const { getData } = require('../../data');
const method = 'get';

/**
 * @desc Handles the event when a new block is added to the player's inventory.
 * @param msg
 * @param blockName
 */
function onGetBlock(msg, blockName) {
  const d = getData(msg.author.id);
  if (!d) return;
  const { collected, achievements } = d;

  // Add block to the collected object.
  if (!collected[blockName]) collected[blockName] = 1;
  else collected[blockName]++;

  for (const { verify: { method: _method, block, amount }, id } of achievementsConf) {
    if (_method !== method) continue;
    if (achievements.includes(id)) continue;
    if (collected[block] && collected[block] >= amount)
      addAchievement(msg.member, id);
  }
}

module.exports = onGetBlock;