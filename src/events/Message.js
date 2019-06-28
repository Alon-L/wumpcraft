class Message extends require('../types/Events') {
  constructor() {
    super();
  }

  init(client, msg) {
    if (!msg.guild) return;
    if (msg.author.bot) return;
    if (msg.content === this.prefix) return;
    if (!msg.content.startsWith(this.prefix)) return;

    const permissions = client.permissions(msg.guild.me);
    if (permissions.length) return msg.reply(`I can not perform this command due to missing permissions in this server:\n${permissions.join(', ')}`).catch(() => {});

    const command = msg.content.toLowerCase().split(' ')[0].slice(this.prefix.length);
    const args = msg.content.split(' ').slice(1);

    const { commands, aliases } = client;

    let cmd;
    if (commands.has(command)) {
      cmd = commands.get(command);
    } else if (aliases.has(command)) {
      cmd = commands.get(aliases.get(command));
    }

    if (cmd) new cmd.run().run(client, msg, args);
  }
}

module.exports = Message;