class GuildCreate extends require('../types/Events') {
  constructor() {
    super();
  }

  async init(client, guild) {
    console.log(`+ Joined ${guild.name}(${guild.id}) ${guild.memberCount} members.`);
  }
}

module.exports = {
  run: GuildCreate,
  name: 'guildCreate'
};