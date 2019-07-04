const blocks = require('../configs/blocks');
const player = require('../configs/player');
const hearts = require('../configs/healthbar');

async function uploadEmojis(guild) {
  const emojis = [...Object.values(blocks), player.skull, player.body, ...Object.values(hearts.emojis)];
  for (const emoji of emojis) {
    if (guild.emojis.find(e => e.name === emoji.name)) continue;
    try {
      await guild.createEmoji(`./assets/blocks/${emoji.path}.png`, emoji.name);
    } catch (err) {}
  }
}

module.exports = uploadEmojis;