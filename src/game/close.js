const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const { game: { channels: { text: { member: channelName } } } } = require('../configs/default');
const { getData, data } = require('../data');

/**
 * @desc Close the game channel after a certain delay.
 * @param delay
 * @param reason
 * @param world
 * @param member
 * @param guildId
 * @param guilds
 * @returns {Promise<void>}
 */
async function close(delay, reason, world, member, guildId, guilds) {
  if (guildId && guilds) {
    const guild = guilds.get(guildId);
    if (!guild) return;
    member = await guild.fetchMember(member);
  }

  const d = getData(member.id);
  if (d) {
    data.delete(member.id);
    await deleteMessages(d, reason);
  }

  await new Promise(resolve => {
    setTimeout(resolve, delay);
  });

  const channel = member.guild.channels
    .find(c => c.type === 'text' && c.name === channelName(member));

  await channel.delete('Game over.')
}

/**
 * @desc Adds a close reaction to the world render message. Close game view on reaction.
 * @param msg
 * @param member
 * @returns {Promise<void>}
 */
async function closeReactions(msg, member) {
  await addReactions(msg, '❌');
  reactionCollector(msg, ['❌'], member, function() {
    const d = getData(member.id);
    if (!d) return;
    close(0, 'User closed the game.', d.world, member);
  });
}

/**
 * @desc Delete all game messages.
 * @param d
 * @param reason
 * @returns {Promise<any[]>}
 */
function deleteMessages(d, reason) {
  const { worldRender, achievementsRender, hotbar, health, score, collectors } = d;
  collectors.forEach(c => c.stop('Game over.'));
  return Promise.all([
    worldRender.clearReactions(),
    worldRender.edit(reason.replace(/{SCORE}/gi, score.reduce((acc, curr) => acc + curr, 0))),
    hotbar.delete(),
    health.delete(),
    achievementsRender.delete()
  ]);
}

module.exports = {
  close,
  closeReactions
};