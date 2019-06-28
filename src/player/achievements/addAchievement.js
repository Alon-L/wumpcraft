const achievementsConf = require('../../configs/achievements');
const { close } = require('../../game/close');
const renderAchievements = require('./renderAchievements');
const deleteWorld = require('../../world/deleteWorld');
const { getData } = require('../../data');

/**
 * @desc Adds an achievement to the player and adds the achievement's score to their base score.
 * @param msg
 * @param id
 * @returns {Promise<void>}
 */
async function addAchievement(msg, id) {
  const d = getData(msg.member.id);
  if (!d) return;

  const { achievements, achievementsRender, world } = d;

  achievementsConf.forEach(({ id: _id, score }) => {
    if (_id === id) {
      world.player.score.push(score);
    }
  });

  achievements.push(id);
  await achievementsRender.edit(renderAchievements(achievements));

  if (achievements.length === achievementsConf.length) achievementsComplete(d, msg);
}

/**
 * @desc Runs whenever all the achievements are complete by the player.
 * @param d
 * @param msg
 */
function achievementsComplete({ world, achievements }, msg) {
  // eslint-disable-next-line promise/catch-or-return
  close(20000, `
Congratulations!
You have completed all ${achievements.length} achievements and beat the game!
Your score: {SCORE}
    `, world, msg.member, undefined, undefined, true)
  .then((keepPlaying) => {
    // eslint-disable-next-line promise/always-return
    if (!keepPlaying) deleteWorld(msg.member.id);
  });
}

module.exports = addAchievement;