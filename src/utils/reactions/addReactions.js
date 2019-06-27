/**
 * @desc Adds a group of reactions to a message.
 * @param msg
 * @param reactions
 * @returns {Promise<void>}
 */
async function addReactions(msg, ...reactions) {
  const reactionsValues = Object.values(reactions);
  for (let i = 0; i < reactionsValues.length; i++) {
    try {
      await msg.react(reactionsValues[i]);
    } catch(err) {}
  }
}

module.exports = addReactions;