async function addReactions(msg, reactions) {
  const reactionsValues = Object.values(reactions);
  for (let i = 0; i < reactionsValues.length; i++) {
      await msg.react(reactionsValues[i]);
  }
}

module.exports = addReactions;