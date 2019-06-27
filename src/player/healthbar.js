const healthbarConf = require('../configs/healthbar');
const { game: { player: { maxHearts } } } = require('../configs/default');
const { emojiFormat } = require('../utils/generalMethods');
const onDead = require('./events/onDead');
const onDamage = require('./events/onDamage');
const { getData } = require('../data');
const updateScene = require('../game/updateScene');

/**
 * @desc Handles any changes in the player's health.
 * @param hearts
 * @param msg
 * @param reason
 * @returns {string|boolean|?}
 */
function healthbar(hearts, msg, reason) {
  hearts = hearts < 0 ? 0 : hearts;
  const d = getData(msg.author.id);
  if (!d) return;

  d.world.player.hearts = Math.floor(hearts);
  updateScene(d.worldRender, msg.author.id, d.world);

  if (hearts <= 0) return onDead(msg.member);
  onDamage(msg.member, reason);

  return renderHealthbar(hearts);
}

/**
 * @desc Render the healthbar hearts into the healthbar message.
 * @param hearts
 * @returns {string|string}
 */
function renderHealthbar(hearts) {
  let str = '';
  const emptyHearts = maxHearts - hearts;
  for (let i = 0; i < hearts; i++) {
    str += emojiFormat(healthbarConf.emojis.full.id);
  }
  for (let i = 0; i < emptyHearts; i++) {
    str += emojiFormat(healthbarConf.emojis.empty.id);
  }
  return str;
}

module.exports = healthbar;