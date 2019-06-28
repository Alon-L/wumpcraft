const { getData } = require('../../data');

/**
 * @desc Adds a standard Discord.js reaction collector to a message.
 * @param msg
 * @param reactions
 * @param author
 * @param callback
 * @param settings
 * @param timeoutCallback
 * @param dataRequired
 */
function reactionCollector(msg,
                           reactions,
                           author,
                           callback,
                           settings = { time: false },
                           timeoutCallback = () => {},
                           dataRequired = true
) {
  const filter = (reaction, user) => {
    return reactions.includes(reaction.emoji.name) && user.id === author.id;
  };
  const collector = msg.createReactionCollector(filter, settings);
  if (dataRequired) {
    const d = getData(author.id);
    if (!d) return;
    d.collectors.push(collector);
  }
  collector.on('collect', async (r) => {
    await r.remove(author);
    await callback(r);
  });
  collector.on('end', timeoutCallback);
}

module.exports = reactionCollector;