const { getData } = require('../data');
const { close } = require('../game/close');

class GuildMemberRemove extends require('../types/Events') {
  constructor() {
    super();
  }

  async init(client, member) {
    const d = getData(member.id);
    if (!d) return;
    close(0, 'User left the server.', d.world, member);
  }
}

module.exports = {
  run: GuildMemberRemove,
  name: 'guildMemberRemove'
};