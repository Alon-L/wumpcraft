class GuildDelete extends require('../types/Events') {
  constructor() {
    super();
  }

  async init(client, guild) {
    console.log(`- Left ${guild.name}(${guild.id}) ${guild.memberCount} members.`);
  }
}

module.exports = {
  run: GuildDelete,
  name: 'guildDelete'
};