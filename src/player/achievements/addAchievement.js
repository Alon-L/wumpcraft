const achievementsConf = require('../../configs/achievements');
const { close } = require('../../game/close');
const renderAchievements = require('./renderAchievements');
const deleteWorld = require('../../world/deleteWorld');
const { getData } = require('../../data');

/**
 * @desc Adds an achievement to the player and adds the achievement's score to their base score.
 * @param member
 * @param id
 * @returns {Promise<void>}
 */
async function addAchievement(member, id) {
  const d = getData(member.id);
  if (!d) return;

  let { achievements, achievementsRender, world } = d;

  achievementsConf.forEach(({ id: _id, score }) => {
    if (_id === id) world.player.score.push(score);
  });

  achievements.push(id);
  await achievementsRender.edit(renderAchievements(achievements));

  if (achievements.length === achievementsConf.length) achievementsComplete(d, member);
}

/**
 * @desc Runs whenever all the achievements are complete by the player.
 * @param d
 * @param member
 */
function achievementsComplete(d, member) {
  close(20000, `
Congratulations!
You have completed all ${achievements.length} achievements and beat the game!
Your score: {SCORE}
    `, d.world, member);
  deleteWorld(member.id);
}

module.exports = addAchievement;