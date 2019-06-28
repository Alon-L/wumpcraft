const achievementsConf = require('../../configs/achievements');
const addAchievement = require('../achievements/addAchievement');
const { getData } = require('../../data');
const method = 'get';

/**
 * @desc Handles the event when a new block is added to the player's inventory.
 * @param msg
 * @param block
 */
function onGetBlock(msg, block) {
  const d = getData(msg.author.id);
  if (!d) return;

  const { name: blockName } = block;
  const { collected, achievements } = d;

  // Add block to the collected object.
  if (!block.placed) {
    if (!collected[blockName]) collected[blockName] = 1;
    else collected[blockName]++;
  }

  for (const { verify: { method: _method, block, amount }, id } of achievementsConf) {
    if (_method !== method) continue;
    if (achievements.includes(id)) continue;
    let succeed = 0;
    if (block instanceof Array && amount instanceof Array) {
      for (let i = 0; i < block.length; i++) {
        if (collected[block[i]] && collected[block[i]] >= amount[i]) succeed++;
      }
    } else if (collected[block] && collected[block] >= amount) return addAchievement(msg, id);
    if (succeed >= block.length) addAchievement(msg, id);
  }
}

module.exports = onGetBlock;