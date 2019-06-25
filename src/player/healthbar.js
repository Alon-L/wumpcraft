const healthbarConf = require('../configs/healthbar');
const { emojiFormat } = require('../utils/generalMethods');
const maxHearts = 10;

function healthbar(hearts) {
  // TODO: Do something if hearts is 0.
  return renderHealthbar(hearts);
}

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