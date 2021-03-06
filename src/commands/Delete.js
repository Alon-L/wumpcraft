const addReactions = require('../utils/reactions/addReactions');
const reactionCollector = require('../utils/reactions/reactionCollector');
const worldExists = require('../world/worldExists');
const deleteWorld = require('../world/deleteWorld');
const { close } = require('../game/close');
const { getData } = require('../data');

class Delete extends require('../types/Command') {
  constructor() {
    super();
  }

  async run(client, msg) {
    if (!worldExists(msg.author.id)) return msg.channel.send(`
❌ You do not have a saved world.
You can create one by typing \`${this.prefix}play\`. 🎮
    `);

    const reply = await msg.reply(`
Deleting a world is a permanent effect that could not be reversed.
Are you sure you want to delete your world?
React with ✅ to confirm.
    `);
    await addReactions(reply, '✅');
    reactionCollector(reply, ['✅'], msg.author, () => {
      Delete.confirmed(msg);
      reply.edit('🗑 You have successfully deleted your world.');
    }, { time: 10000 }, () => {
      reply.clearReactions();
    }, false);
  }

  static confirmed(msg) {
    const d = getData(msg.member.id);
    if (d) close(0, 'World deleted.', d.world, msg.member);
    deleteWorld(msg.member.id);
  }
}

module.exports = {
  run: Delete,
  conf: {
    aliases: [],
  },
  help: {
    name: 'delete',
    description: 'Delete your world.',
    usage: 'delete',
    priority: 1
  }
};