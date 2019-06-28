/**
 * @desc Adds a group of reactions to a message.
 * @param msg
 * @param reactions
 * @returns {Promise<void>}
 */
async function addReactions(msg, ...reactions) {
  for (let i = 0; i < reactions.length; i++) {
    try {
      await msg.react(reactions[i]);
    } catch(err) {
      console.error(err);
    }
  }
}

module.exports = addReactions;