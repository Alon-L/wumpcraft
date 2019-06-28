const { getData } = require('../data');

class Spectate extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg) {
    const member = msg.mentions.members.first();
    if (!member) return msg.channel.send('❌ Please mention the member you wish to spectate on.');
    const name = `${member.displayName}#${member.user.discriminator}`;
    const d = getData(member.id);
    if (!d) return msg.channel.send(`❌
 ${name} does not have an active game view.`);
    await d.channel.overwritePermissions(msg.author, {
      READ_MESSAGES: true
    });
    msg.channel.send(`🔭 You can now spectate ${name} in ${d.channel}`)
      .then(reply => reply.delete(10000));
  }
}

module.exports = {
  run: Spectate,
  conf: {
    aliases: ['spec'],
  },
  help: {
    name: 'spectate',
    description: 'Spectate a member\'s world while they are playing.',
    usage: 'spectate [@user]',
    priority: 2
  }
};