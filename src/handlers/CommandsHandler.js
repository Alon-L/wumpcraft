const fs = require('fs');
const path = require('path');

class CommandsHandler {
  constructor(client) {
    this.client = client;
  }

  load() {
    const commands = fs.readdirSync(path.join(__dirname + '../../commands'));
    console.log(`Loading a total of ${commands.length} commands.`);
    for (const file of commands) {
      const prop = require(`../commands/${file}`);
      console.log(`Loading Command: ${prop.help.name}.`);
      this.client.commands.set(prop.help.name, prop);
      prop.conf.aliases.map((alias) => {
        this.client.aliases.set(alias, prop.help.name);
      });
    }
  }
}

module.exports = CommandsHandler;