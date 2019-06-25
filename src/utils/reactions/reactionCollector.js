function reactionCollector(msg, reactions, author, callback) {
  const filter = (reaction, user) => {
    return Object.values(reactions).includes(reaction.emoji.name) && user.id === author.id;
  };
  const collector = msg.createReactionCollector(filter, { time: false });
  collector.on('collect', async(r) => {
    r.remove(author);
    await callback(r);
  });
}

module.exports = reactionCollector;