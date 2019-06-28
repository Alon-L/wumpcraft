const achievementsConf = require('../../configs/achievements');
const addAchievement = require('../achievements/addAchievement');
const { getData } = require('../../data');
const method = 'damage';

/**
 * @desc Handles the event when the player takes damage.
 * @param msg
 * @param reason
 */
function onDamage(msg, reason) {
  const d = getData(msg.member.id);
  if (!d) return;
  const { achievements } = d;

  for (const { verify: { method: _method, reason: _reason }, id } of achievementsConf) {
    if (_method !== method) continue;
    if (achievements.includes(id)) continue;
    if (reason === _reason) addAchievement(msg, id);
  }
}

module.exports = onDamage;