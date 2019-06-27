const achievementsConf = require('../../configs/achievements');

/**
 * @desc Render the achievements message.
 * @param achievements
 * @returns {string}
 */
function renderAchievements(achievements) {
  let str = '__Achievements:__\n';

  const incomplete = [];
  const complete = [];

  achievementsConf.forEach(({ id, title, desc }) => {
    if (!achievements.includes(id)) incomplete.push({ title, desc });
    else complete.push({ title, desc });
  });

  incomplete.slice(0, 3).forEach(({ title, desc }) => {
    str += `❌ ${title} - ${desc}\n`;
  });

  str += '\n\n';

  complete.forEach(({ title, desc }) => {
    str += `✅ ${title} - ${desc}\n`;
  });

  return str;
}

module.exports = renderAchievements;